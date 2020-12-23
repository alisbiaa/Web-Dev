<?php
require_once("../utils/_init.php");

// user cant book if there not enough slots
// user cant book if he is an admin
// user cant book if he have already a booking.

// if you are not connected you will be redirected to home page
if (!$auth->is_authenticated())
    redirect("index.php");
//

if (verify_get("id")) {
    $id = $_GET["id"];
    // Find the appointment
    $appointment = $calendar->findById($id);
    $user = $auth->authenticated_user();
    $_SESSION["id"] = $id;
}
// if you try to access this page without a valid id
else
    redirect("index.php");

?>

<?php require("../partials/header.inc.php") ?>
    <!--Here the site must display the date, time, and the logged in user's data (name, address and SSN number), and a checkbox to-->
    <div class="card">
        <div class="card-header">
            Book a date :
        </div>
<!--        <input type="hidden" value="--><?//=$id?><!--" name="id">-->
        <form method="post" action="successBooking.php">
        <div class="card-body">
            <h5 class="card-title"><?=$appointment["date"]?> at 10:00</h5>
            <p class="card-text">
                Dear <?=$user['fullname']?><br>
                address : <?= $user['address']?><br>
                SSN number : <?=$user['SSN']?><br>
            </p>
            <?php if(!isset($user["appointmentId"])): ?>
            <p>
                <input type="checkbox" name="policy" id="policy">
                <label for="policy">
                    I agree with <a href="#">Privacy Policy</a> and <a href="#"> Website terms and conditions of use.</a>
                </label>
            </p>
            <button class="btn btn-primary">Book this date</button>
            <?php else : ?>
                <small> <a href="/../HomeProject/booking/cancelAppointement.php?id=<?=$user["appointmentId"]?>" style="color: red"> Cancel appointment</a> </small>
            <?php endif?>
        </div>
        </form>
    </div>


<?php require("../partials/footer.inc.php");?>