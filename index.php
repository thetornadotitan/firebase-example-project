<!DOCTYPE html>
<html>

    <?php require_once($_SERVER['DOCUMENT_ROOT']."/templates/header.php"); ?>

        <div class="container">
            <div id="message-card" class="card text-white bg-dark mb-3">
                <div class="card-header">Messages</div>
                <div class="card-body">
                    <div id='messagesConsoleContainer' class="card-text">
                        <div id='messagesConsole'></div>
                    </div>
                    <div id='message-input-field' class="card-text message-input-field">
                        <input id="messageText" class="form-control" type="text" placeholder="Message">
                        <button id="messageBtn" type="button" class="btn btn-primary">Submit</button>
                    </div>
                </div>
            </div>

            <div class="card text-white bg-dark mb-3">
                <div class="card-header">Account details</div>
                <div class="card-body">
                    <p class="card-text">
                        <div id="account-details"></div>
                        <div id="sign-in"></div>
                    </p>
                </div>
            </div>
        </div>


        <script defer src="https://www.gstatic.com/firebasejs/5.7.0/firebase-app.js"></script>
        <script defer src="https://www.gstatic.com/firebasejs/5.7.0/firebase-auth.js"></script>
        <script defer src="https://www.gstatic.com/firebasejs/5.7.0/firebase-database.js"></script>
        <script defer src="https://cdn.firebase.com/libs/firebaseui/3.4.1/firebaseui.js"></script>

        <link rel="stylesheet" type="text/css" media="screen" href="main.css" />
        <link type="text/css" rel="stylesheet" href="https://cdn.firebase.com/libs/firebaseui/3.4.1/firebaseui.css" />

        <script defer src="main.js"></script>

    <?php require_once($_SERVER['DOCUMENT_ROOT']."/templates/footer.php"); ?>

</html>