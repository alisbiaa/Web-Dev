<?php
require_once("../utils/_init.php");

if (verify_get("id")) {
    $appointmentID = $_GET["id"];  // appointment ID

    // Find the appointment
    $appointment = $calendar->findById($appointmentID);

    // Find the user
    $user = $_SESSION["user"];
    $userID = $user["id"];


    // User cannot book appointment as admin


    // update the appointement
    $index = array_search($userID,$appointment["users"]); // TOOOK ME AGES TO UNDERSTAND
    unset($appointment["users"][$index]);
    $appointment["slots"] = $appointment["slots"] + 1;
    $calendar->update($appointmentID, $appointment);

    // update the user
    unset($user["appointmentId"]) ;
    $userStorage->update($userID, $user);

    //update session
    $_SESSION["user"] = $user;
    $auth->update();

    $successes[] = "You have canceled your appointment.";
    save_to_flash("successes",$successes);
    redirect("../index.php");

}
?>

