<?php
require_once("utils/_init.php");

if (verify_post("email", "password")) {
    $email = trim($_POST["email"]);
    $password = $_POST["password"];

    // Look for the user with this username and password
    $user = $auth->authenticate($email, $password);
    // If the user is not found
    if ($user === NULL) {
        $errors[] = "Invalid username or password";
    }

    // If there were no errors...
    if (empty($errors)) {
        // Log in the user
        $auth->login($user);
        redirect("index.php");
    }
}

?>
<?php require("partials/header.inc.php") ?>
    <h1>Log in</h1>

    <form class="col-md-6 col-xs-12" method="post">
        <div class="form-group">
            <label for="email">Email</label>
            <input class="form-control" type="text" name="email" id="email" value="<?= $email ?? "" ?>">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input class="form-control" type="password" name="password" id="password">
        </div>
        <button class="btn btn-primary">Log in</button>
        <a href="signup.php">If you don't have a user yet, you can sign up here</a>

        <?php require("partials/errors.inc.php") ?>
    </form>

<?php require("partials/footer.inc.php") ?>