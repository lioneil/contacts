<?php

namespace Api\Middleware;

use GuzzleHttp\Client;

class AllowRequestsIfHubSpotAccessTokenValid
{
    public function enable(): void
    {
        header('Content-Type: application/json');

        if (!isset($_SESSION['access_token'])) {
            http_response_code(403);
            echo json_encode(['error' => 'Invalid token']);
            exit;
        }

        if ($this->isExpired()) {
            $this->refresh();
        }
    }

    public function isExpired(): bool
    {
        return ($_SESSION['token_expiration'] <= time());
    }

    public function refresh(): void
    {
        $client = new Client;
        $params = [
            'grant_type' => 'refresh_token',
            'client_id' => $_ENV['HUBSPOT_CLIENT_ID'],
            'client_secret' => $_ENV['HUBSPOT_CLIENT_SECRET'],
            'refresh_token' => $_SESSION['refresh_token'],
        ];

        $response = $client->post('https://api.hubapi.com/oauth/v1/token', [
            'form_params' => $params,
        ]);

        $data = json_decode($response->getBody(), true);

        $_SESSION['access_token'] = $data['access_token'];
        $_SESSION['refresh_token'] = $data['refresh_token'];
        $_SESSION['token_expiration'] = time() + 60;
    }
}
