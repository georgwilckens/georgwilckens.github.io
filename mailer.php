<?php
    // Added input sanitizing to prevent injection

    // Only process POST reqeusts.
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Get the form fields and remove whitespace.
        $name = strip_tags(trim($_POST["name"]));
        $name = str_replace(array("\r","\n"),array(" "," "),$name);
        $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
        $guests = $_POST["guests"];
        $attend = $_POST["attend"];
//        $song_name = trim($_POST["song_name"]);
//        $song_artist = trim($_POST["song_artist"]);
        $message = trim($_POST["message"]);


        if ($attend ==="yes") {
        ob_start();
        ?>
    <html>
        <head>
        </head>
        <body>
            <table width="550" border="1" cellspacing="2" cellpadding="2">
                <tr bgcolor="#eeffee">
                <td>Attending</td>
                <td><?= $attend; ?></td>
                </tr>
                <tr bgcolor="#eeeeff">
                <td>Name</td>
                <td><?= $name; ?></td>
                </tr>
                <tr bgcolor="#eeffee">
                <td>Email</td>
                <td><?= $email; ?></td>
                </tr>
                <tr bgcolor="#eeeeff">
                <td>No. of Guests</td>
                <td><?= $guests; ?></td>
                </tr>
                <tr bgcolor="#eeffee">
                <td>No. of Kids</td>
                <td><?= $kids; ?></td>
                </tr>
                <tr bgcolor="#eeffee">
                <td>Message</td>
                <td><?= $message; ?></td>
                </tr>
            </table>
        </body>
    </html>

<?php

     }

    else {
    ob_start();
?>
<html>
    <head>
    </head>
    <body>
        <table width="550" border="1" cellspacing="2" cellpadding="2">
            <tr bgcolor="#eeffee">
            <td>Attending</td>
            <td><?= $attend; ?></td>
            </tr>
            <tr bgcolor="#eeeeff">
            <td>Name</td>
            <td><?=$name;?></td>
            </tr>
            <tr bgcolor="#eeffee">
            <td>Comments</td>
            <td><?= $message; ?></td>
            </tr>
        </table>
    </body>
</html>

<?php

 }
    $body = ob_get_contents();

    ob_end_clean();

    require_once('class.phpmailer.php');

    //PHPMailer Object
    $mail = new PHPMailer;

    //From email address and name
    $mail->From = "$email";
    $mail->FromName = "$name";

    //To address and name
    $mail->addAddress("georg.wilckens@gmail.com", "Georg Wilckens");//Recipient name is optional. Remove , "Falconerie"


    //Address to which recipient will reply
    $mail->addReplyTo("$email", "Reply");

    //CC and BCC
    //$mail->addCC("falconerie.stampede@gmail.com"); //CC your wife or your husband
    //$mail->addBCC("bcc@example.com"); //optional: remove this if you have no one to bcc

    //Send HTML or Plain Text email
    $mail->WordWrap = 50;
    $mail->isHTML(true);

    $mail->Subject = "HOCHZEITSANMELDUNG von $name";
    $mail->Body = "$body";
    $mail->AltBody = "This is the plain text version of the email content";

    if(!$mail->send()) {
            echo "Mailer Error: " . $mail->ErrorInfo;
        }
        else {
            echo "Message has been sent successfully";
        }
    }
    else {
        // Not a POST request, set a 403 (forbidden) response code.
        http_response_code(403);
        echo "There was a problem with your submission, please try again.";
    }

?>