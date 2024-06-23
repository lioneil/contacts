<?php

require 'bootstrap.php';

// Serve the React app
if (file_exists(__DIR__.'/build/template.html')) {
    echo file_get_contents(__DIR__.'/build/template.html');
} else {
    echo "App not found. Please build the React app.";
}
