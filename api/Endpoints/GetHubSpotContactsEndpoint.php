<?php

namespace Api\Endpoints;

class GetHubSpotContactsEndpoint extends BaseEndpoint
{
    public function handle(array $params = [])
    {
        $accessToken = $_SESSION['access_token'];
        $response = $this->client->get("https://api.hubapi.com/crm/v3/objects/contacts", [
            'headers' => [
                'Authorization' => "Bearer $accessToken",
            ],
            'query' => $params,
        ]);

        return json_decode($response->getBody(), true);
    }
}
