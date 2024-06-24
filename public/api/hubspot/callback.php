<?php require __DIR__ . '/../../../bootstrap.php';

use Api\Endpoints\GetHubSpotAccessTokenEndpoint;

$code = $_GET['code'];

if (empty($code)) {
    http_response_code(404);
    echo "TODO: handle 404 page here";
    exit;
}

$hubspot = new GetHubSpotAccessTokenEndpoint;
$hubspot->handle($code);
$accessToken = $hubspot->getAccessToken();
$refreshToken = $hubspot->getRefreshToken();

if (empty($accessToken)) {
    http_response_code(404);
    echo "TODO: handle 404 page here";
    exit;
}

header("Location: /dashboard");
exit;
