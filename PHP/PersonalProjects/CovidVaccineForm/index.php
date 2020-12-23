<?php
require_once("utils/_init.php");
// Fetch all records from the data source
$dates = $calendar->findAll(); // Array of topics
?>



<?php require("partials/header.inc.php") ?>

<div class="card">
    <div class="card-body">
        <p> As Covid-19 vaccines roll out, this website is created to facilitate booking appointments remotely</p>
    </div>
</div>

<?php require("partials/errors.inc.php") ?>

<div class="list-group mt-4">
    <?php foreach($dates as $date) : ?>
        <div class="list-group-item list-group-item-action">
            <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1"><?= $date["date"] ?></h5>
                <?php if ($auth->authenticated_user() &&  !in_array("admin",$auth->authenticated_user()["roles"]) ) : ?>
                    <?php if ($date["slots"] > 0 && empty($auth->authenticated_user()["appointmentId"])): ?>
                        <small> <a href="booking/appointment.php?id=<?=$date["id"]?>" >  Book this date </a> </small>
                    <?php elseif($auth->authenticated_user()["appointmentId"]==$date["id"]) : ?>
                        <small> <a href="booking/cancelAppointement.php?id=<?=$date["id"]?>" style="color: red"> Cancel appointment</a> </small>
                    <?php endif?>
                <?php endif?>
            </div>
            <p class="mb-1">Available Appointments : <?= $date["slots"] ?></p>
        </div>
    <?php endforeach; ?>
</div> <!-- END: .list-group -->

<div class="card">
    <div class="card-body">
        <p> Confidential Information must be treated with respect and care by any workforce member who is authorized
            to have access to this information.  Workforce members who are authorized to use or disclose Confidential Information also have the responsibility to safeguard access
            to such information.
            Workforce members who are authorized by the government to access Confidential Information have a responsibility to limit access to those that are allowed by permission
            and/or by law. </p>

    </div>
</div>

<?php require("partials/footer.inc.php");?>
