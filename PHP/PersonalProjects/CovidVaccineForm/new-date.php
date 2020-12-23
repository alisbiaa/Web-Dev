


<?php
// Include dependencies
require_once("utils/_init.php");
// to avoid booking creation from nan ADMIN users
if (!( $auth->is_authenticated() && in_array("admin",$auth->authenticated_user()["roles"]) ) )
    redirect("index.php");

$currentDate =  date("Y/m/d");

// Process the input
// 1: check if the input exists

if (verify_post("date", "slots")) {
    // 2 : Read/preprocess the input
    $date = $_POST["date"];
    $slots = $_POST["slots"];

    // 3 : Validate input / check for errors
    if (empty($slots) || $slots < 1 ) {
        $errors[] = "Slots number must be at least 1 !";
    }
    if (strtotime($date) < strtotime($currentDate)) {
        $errors[] = "${date} is older than ${currentDate}";
    }

    // 4 : If there are no errors then process input
    if (empty($errors)) {
        // 5 : Add new record to the data file
        $newAppointment = [
            "date" => $date,
            "slots" => $slots,
            "lastUpdate" => date("Y-m-d H:i:s"),
            "users" => [],
        ];
        $calendar->add($newAppointment);
        redirect("index.php");
    }

}
?>

<?php require("partials/header.inc.php") ?>
<h1>Post a new date</h1>
<form class="col-md-6 col-xs-12" method="post">
    <div class="form-group">
        <label for="date"> Input date </label>
        <input class="form-control" type="date" name="date" id="date" value="<?= $date ?? "" ?>">
    </div>
    <div class="form-group">
        <label for="description">Total slots</label>
        <input class="form-control" type="number" name="slots" id="slots" value="<?= $slots ?? "" ?>">
    </div>
    <button class="btn btn-primary">Create</button>
</form>
<?php require("partials/errors.inc.php") ?>
<?php require("partials/footer.inc.php") ?>
