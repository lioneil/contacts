<?php require __DIR__ . '/../../../bootstrap.php';

use Api\Endpoints\GetHubSpotUrlEndpoint;
use Api\Middleware\AllowAjaxRequestsOnly;

(new AllowAjaxRequestsOnly)->enable();

$hubSpot = new GetHubSpotUrlEndpoint();

echo json_encode(['url' => $hubSpot->getUrl()]);
