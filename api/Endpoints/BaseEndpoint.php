<?php

namespace Api\Endpoints;

use GuzzleHttp\Client;

class BaseEndpoint
{
    /**
     * @var \GuzzleHttp\Client;
     */
    public \GuzzleHttp\Client $client;

    /**
     * @var string
     */
    public string $clientId;

    /**
     * @var string
     */
    public string $clientSecret;

    /**
     * @var string
     */
    public string $redirectUri;

    public function __construct() {
        $this->client = new Client;
        $this->clientId = $_ENV['HUBSPOT_CLIENT_ID'];
        $this->clientSecret = $_ENV['HUBSPOT_CLIENT_SECRET'];
        $this->redirectUri = $_ENV['HUBSPOT_REDIRECT_URI'];
    }
}
