<?php

unset($_SESSION['access_token']);
unset($_SESSION['refresh_token']);

echo "access_token: $_SESSION[access_token]";

header("Location: /");
exit;
