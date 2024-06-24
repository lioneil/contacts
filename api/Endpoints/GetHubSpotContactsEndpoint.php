<?php

namespace Api\Endpoints;

class GetHubSpotContactsEndpoint extends BaseEndpoint
{
    public function handle(array $params = [])
    {
        // https://api.hubapi.com/crm/v3/objects/contacts
        $accessToken = $_SESSION['access_token'];
        $limit = $params['limit'] ?? 10;
        $after = $params['after'] ?? 0;
        $propertyName = $params['propertyName'] ?? 'createdate';
        $startDate = $params['range']['startDate'] ? strtotime($params['range']['startDate']) * 1000 : null;
        $endDate = $params['range']['endDate'] ? strtotime($params['range']['endDate']) * 1000 : null;

        $filterGroups = $params['range']['startDate'] ? [
            'filterGroups' => [
                [
                    'filters' => [
                        [
                            'propertyName' => $propertyName,
                            'operator' => 'BETWEEN',
                            'highValue' => $endDate,
                            'value' => $startDate,
                        ],
                    ],
                ],
            ]
        ] : [];

        $response = $this->client->post("https://api.hubapi.com/crm/v3/objects/contacts/search", [
            'headers' => [
                'Authorization' => "Bearer $accessToken",
                'Accept' => 'application/json',
                'Content-Type' => 'application/json',
            ],
            'json' => [
                'limit' => $limit,
                'after' => $after,
                ...$filterGroups,
            ],
        ]);

        return json_decode($response->getBody(), true);
    }
}
