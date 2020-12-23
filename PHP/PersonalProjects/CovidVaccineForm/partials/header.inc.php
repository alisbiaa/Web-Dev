<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PHP HomeProject</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
</head>
<html lang="en">

<body>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">The National Health Centre</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
                <a class="nav-link" href="/../HomeProject/index.php">Home <span class="sr-only">(current)</span></a>
            </li>

            <!--            ---- Home-->
            <?php if ($auth->is_authenticated()): // If there is a user logged in ?>
                <?php if(in_array("admin",$auth->authenticated_user()["roles"])) : ?>
                <li class="nav-item">
                    <a class="nav-link" style="color: red" href="new-date.php">Create appointment</a>
                </li>
            <!--            ---- Create appointment for ADMIN-->

                <?php elseif (!empty($auth->authenticated_user()["appointmentId"])): ?>
                    <li class="nav-item">
                        <a class="nav-link" href="/../HomeProject/booking/appointment.php?id=<?=$auth->authenticated_user()["appointmentId"]?>" tabindex="-1"  style="color: green">Your Appointment</a>
                    </li>
                <?php endif; ?>
            <?php endif; ?>

<!--            ---- In case our customer did book an appointment already -->
        </ul>
        <form class="form-inline my-2 my-lg-0 ">
            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>


        <?php if ($auth->is_authenticated()): // If there is a user logged in ?>
            <a class="btn btn-outline-primary" href="logout.php">Log out (<?= $auth->authenticated_user()["fullname"] ?>)</a>
        <?php else: ?>
            <a href="login.php" class="btn btn-outline-primary" style="margin-left: 5px">Login</a>
        <?php endif; ?>
    </div>
</nav>



