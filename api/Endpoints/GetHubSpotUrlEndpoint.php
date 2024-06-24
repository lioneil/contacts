<?php

namespace Api\Endpoints;

class GetHubSpotUrlEndpoint
{
    public function getUrl(): string
    {
        $clientId = $_ENV['HUBSPOT_CLIENT_ID'];
        $redirectUri = $_ENV['HUBSPOT_REDIRECT_URI'];
        return "https://app.hubspot.com/oauth/authorize?client_id={$clientId}&redirect_uri={$redirectUri}&scope=crm.objects.contacts.write%20crm.schemas.contacts.write%20oauth%20crm.schemas.contacts.read%20crm.objects.contacts.read";
    }
}
