<?php require __DIR__ . '/../../../bootstrap.php';

use Api\Middleware\AllowAjaxRequestsOnly;

(new AllowAjaxRequestsOnly)->enable();

if (isset($_SESSION['access_token'])) {
    echo json_encode(['isAuthenticated' => true]);
} else {
    echo json_encode(['isAuthenticated' => false]);
}
