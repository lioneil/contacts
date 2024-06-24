<?php require __DIR__ . '/../../../bootstrap.php';

use Api\Endpoints\GetHubSpotContactsEndpoint;
use Api\Middleware\AllowAjaxRequestsOnly;
use Api\Middleware\AllowRequestsIfHubSpotAccessTokenValid;

//(new AllowAjaxRequestsOnly)->enable();
(new AllowRequestsIfHubSpotAccessTokenValid)->enable();

$hubspot = new GetHubSpotContactsEndpoint;
$contacts = $hubspot->handle([
    'limit' => $_GET['limit'] ?? 10,
    'offset' => $_GET['offset'] ?? 0,
    'range' => $_GET['range'] ?? [],
    'after' => $_GET['after'] ?? null,
]);

echo json_encode($contacts);
