<?php
require_once("utils/_init.php");

if (verify_post("email", "password", "confirm-password", "fullname","address","SSN")) {
    $fullname = trim($_POST["fullname"]);
    $SSN = trim($_POST["SSN"]);
    $email = trim($_POST["email"]);
    $address = trim($_POST["address"]);
    $password = $_POST["password"];
    $confirm_password = $_POST["confirm-password"];

//  -------- Validating Full name
    if (empty($fullname)) {
        $errors[]= "Full name : empty";
    }
    elseif (!preg_match("/^[a-zA-Z- ']*$/",$fullname)) {
        $errors[]= "Full name : only letters and white space allowed";
    }

//  -------- Validating SSN
    if (!preg_match("/^[1-9- ']*$/",$SSN)) {
        $errors[]= "SSN number : consists of numbers only";
    }
    elseif (strlen($SSN) !== 9) {
        $errors [] = "SSN number : 9 characters long ";
    }

//  -------- Validating address
    if (empty($address)) {
        $errors[]= "Address : empty";
    }

// ------- Validating Email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL) || empty($email)) {
        $errors[] = "Email : Invalid format";
    }
    // Email not taken
    elseif ($auth->user_exists($email)) {
        $errors[] = "Email : already taken";
    }

// ----- Validating password

    // Password length
//    if (strlen($password) < 8) {
//        $errors[] = "Password : must be at least 8 characters long";
//    }

    // Passwords match
    if ($password !== $confirm_password) {
        $errors[] = "Passwords : do not match";
    }



    // If there were no errors...
    if (empty($errors)) {
        $successes[] = "Registration successful. Please log in.";
        save_to_flash("successes", $successes);

        // Register the new user
        $auth->register([
            "fullname" => $fullname,
            "SSN" => $SSN,
            "address" => $address,
            "email" => $email,
            "password" => $password,
        ]);
        redirect("login.php");
    }
}

?>
<?php require_once("partials/header.inc.php") ?>
    <h1>Sign up</h1>

    <form class="col-md-6 col-xs-12" method="post">
        <div class="form-group">
            <label for="fullname">Full name</label>
            <input class="form-control" type="text" name="fullname" id="fullname" value="<?= $fullname ?? "" ?>">
        </div>
<!--        ---- Full Name -->

        <div class="form-group">
            <label for="SSN">Social Security Number (SSN)</label>
            <input class="form-control" type="text" name="SSN" id="SSN" value="<?= $SSN?? "" ?>">
        </div>
<!--        ---- SSN -->

        <div class="form-group">
            <label for="email">Email</label>
            <input class="form-control" type="email" name="email" id="email"value="<?= $email?? "" ?>">
        </div>
<!--        ---- Email -->

        <div class="form-group">
            <label for="address">Address</label>
            <input class="form-control" type="text" name="address" id="address" value="<?= $address?? "" ?>">
        </div>
<!--        ----- Address-->

        <div class="form-group">
            <label for="password">Password</label>
            <input class="form-control" type="password" name="password" id="password">
        </div>

        <div class="form-group">
            <label for="confirm-password">Confirm password</label>
            <input class="form-control" type="password" name="confirm-password" id="confirm-password">
        </div>
<!--        ---- Password -->

        <button class="btn btn-primary">Submit</button>
        <a href="login.php">If you already have a user yet, you can log in here</a>

        <?php require("partials/errors.inc.php") ?>
    </form>

<?php require("partials/footer.inc.php") ?>

<!---->
<!--Full name: required-->
<!--SSN number: required, 9 characters long, consists of numbers only, e.g. 123456789-->
<!--address: required-->
<!--e-mail: required, unique for each user, email format-->
<!--Password: required-->
<!--Password confirmation: required, must match the password-->
