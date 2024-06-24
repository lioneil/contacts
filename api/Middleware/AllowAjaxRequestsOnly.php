<?php

namespace Api\Middleware;

class AllowAjaxRequestsOnly
{
    public function enable() {
        header('Content-Type: application/json');

        if (
            !isset($_SERVER['HTTP_X_REQUESTED_WITH']) ||
            (strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) !== 'xmlhttprequest')
        ) {
            http_response_code(403);
            echo json_encode(['error' => 'Forbidden']);
            exit;
        }
    }
}
