<?php
/**
 * Hostinger PHP Fallback Entry Point
 * Serves index.html when deployed in PHP web environments
 */
if (file_exists(__DIR__ . '/index.html')) {
    include_once(__DIR__ . '/index.html');
} else {
    header("Location: index.html");
    exit();
}
