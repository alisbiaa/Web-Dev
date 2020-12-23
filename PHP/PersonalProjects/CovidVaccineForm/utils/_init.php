<?php
// Start session
session_start();

require_once(__DIR__. "/input.inc.php");
require_once(__DIR__."/storage.inc.php");
require_once(__DIR__."/navigation.inc.php");
require_once(__DIR__."/auth.inc.php");
require_once(__DIR__."/flash.inc.php");

// Load (all) all data sources
$userStorage = new Storage(new JsonIO(__DIR__ . "/../data/users.json"));
$calendar = new Storage(new JsonIO(__DIR__ . "/../data/calendar.json"));

// Initialize Auth class
$auth = new Auth($userStorage);

// Create (all) global variables
$errors = load_from_flash("errors", []);
$successes = load_from_flash("successes", []);