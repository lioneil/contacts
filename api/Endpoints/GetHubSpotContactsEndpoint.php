<?php

namespace Api\Endpoints;

use DateTime;
use DateTimeZone;

class GetHubSpotContactsEndpoint extends BaseEndpoint
{
    public function handle(array $params = [])
    {
        $accessToken = $_SESSION['access_token'];
        $limit = $params['limit'] ?? 10;
        $after = $params['after'] ?? 0;
        $propertyName = $params['propertyName'] ?? 'createdate';
        $startDate = $params['range']['startDate'] ? $this->formatToISO8601($params['range']['startDate']) : null;
        $endDate = $params['range']['endDate'] ? $this->formatToISO8601($params['range']['endDate']) : null;

        $filters = [
            [
                'propertyName' => $propertyName,
                'operator' => 'BETWEEN',
                'highValue' => $endDate,
                'value' => $startDate,
            ],
        ];

        $filterGroups = $params['range']['startDate'] ? [
            'filterGroups' => [
                [
                    'filters' => $filters,
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

    public function formatToISO8601($date)
    {
        $dateTime = new DateTime($date, new DateTimeZone('UTC'));
        return $dateTime->format('Y-m-d');
    }
}
