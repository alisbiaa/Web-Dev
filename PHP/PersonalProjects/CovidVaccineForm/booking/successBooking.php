<?php
require_once("../utils/_init.php");
// The submitting part

if (!$auth->is_authenticated())
    redirect("../index.php");

if (verify_post("policy")) {
    $id = $_SESSION["id"];
    unset($_SESSION["id"]);
    // Find the appointment
    $appointment = $calendar->findById($id);
    $user = $auth->authenticated_user();
    // User cannot book appointment as admin
    if (!in_array("admin", $user["roles"])) {
        // update the appointement
        $appointment["users"] []= $user["id"];
        $appointment["slots"] = $appointment["slots"] - 1;
        $calendar->update($id, $appointment);

        // update the user
        $user["appointmentId"] = $appointment["id"];
        $userStorage->update($user["id"], $user);

        //update session
        $_SESSION["user"] = $user;
        $auth->update();

        $successes[] = "You have successfully booked your appointment.";
        save_to_flash("successes",$successes);
        redirect("../index.php");
    }

}
else{
    $errors[] = "Please accept terms and conditions of our policy in order to proceed with your booking.";
    save_to_flash("errors",$errors);
    redirect("../index.php");
}

?>