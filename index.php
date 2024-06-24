<?php

require_once 'bootstrap.php';

if (file_exists(__DIR__ . '/build/index.html')) {
    echo file_get_contents(__DIR__ . '/build/index.html');
}
