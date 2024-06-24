<?php

namespace Api\Endpoints;

class GetHubSpotAccessTokenEndpoint extends BaseEndpoint
{
    /**
     * The HubSpot code returned
     * from oAuth redirect.
     *
     * @var string
     */
    protected string $code;

    /**
     * @var string
     */
    protected string $accessToken;

    /**
     * @var string
     */
    protected string $refreshToken;

    public function handle(string $code) {
        $this->code = $code;

        $response = $this->client->post('https://api.hubapi.com/oauth/v1/token', [
            'form_params' => [
                'grant_type' => 'authorization_code',
                'client_id' => $this->clientId,
                'client_secret' => $this->clientSecret,
                'redirect_uri' => $this->redirectUri,
                'code' => $this->code,
            ],
        ]);

        $data = json_decode($response->getBody(), true);
        $this->accessToken = $data['access_token'];
        $this->refreshToken = $data['refresh_token'];

        $_SESSION['access_token'] = $this->accessToken;
        $_SESSION['refresh_token'] = $this->refreshToken;
        $_SESSION['token_expiration'] = time() + 60;

        return [
            'access_token' => $this->accessToken,
            'refresh_token' => $this->refreshToken,
        ];
    }

    /**
     * Retrieve access token.
     *
     * @return string
     */
    public function getAccessToken(): string
    {
        return $this->accessToken;
    }

    /**
     * Retrieve refresh token.
     *
     * @return string
     */
    public function getRefreshToken(): string
    {
        return $this->refreshToken;
    }
}
