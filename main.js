//Document Ready to go, all html loaded. This is before stylesheets, images, etc. are loded.
document.addEventListener("DOMContentLoaded", (e) => {

    const config = {
        apiKey: "AIzaSyDVb0mlaXzchRPXQ9jjjLcMh58tS0odFJQ",
        authDomain: "learningfirebase-77051.firebaseapp.com",
        databaseURL: "https://learningfirebase-77051.firebaseio.com",
        projectId: "learningfirebase-77051",
        //storageBucket: "learningfirebase-77051.appspot.com",
        //messagingSenderId: "1036839089269"
    };

    firebase.initializeApp(config);

    const database = firebase.database();
    const messagesRef = database.ref('messages');

    const messagesConsole = document.getElementById('messagesConsole');
    const messageText = document.getElementById('messageText');
    const messageButton = document.getElementById('messageBtn');

    messagesRef.on('value', (snapshot) => {
        messagesConsole.innerHTML = '';
        const messages = snapshot.val();
        const keys = Object.keys(messages);
        for (let i = 0; i < keys.length; i++) {
            let k = keys[i];
            let name = messages[k].name;
            let message = messages[k].message;
            messagesConsole.innerHTML += `
                <div>${name} :<br />${message}</div>
            `;
            console.log(name, message)
        }
    });

    messageButton.onclick = (e) => {
        if (messageText.value != null && messageText.value != '') {
            messagesRef.push({ "name": firebase.auth().currentUser.displayName + "", "message": messageText.value + "" });
        }
    }

    messageText.onkeydown = (e) => {
        if (e.key == 'Enter') {
            if (typeof messageButton.onclick == "function") {
                messageButton.onclick.apply();
            }
        }
    }

    InitApp();

});

function InitApp() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            const displayName = user.displayName;
            const email = user.email;
            const emailVerified = user.emailVerified;
            const photoURL = user.photoURL;
            const uid = user.uid;
            const phoneNumber = user.phoneNumber;
            const providerData = user.providerData;
            user.getIdToken().then(function (accessToken) {
                let SOBtn = document.getElementById('sign-in');
                SOBtn.innerHTML = `<button type="button" class="btn btn-primary">Sign Out</button>`;
                SOBtn.onclick = (e) => { firebase.auth().signOut(); };
                document.getElementById('account-details').innerHTML = `
                    <div><img src="${photoURL}" style="width: 100px; height: 100px" /></div>
                    <div>
                        <div class='account-details-item'>${displayName}</div>
                        <div class='account-details-item'>${email} is verified ${emailVerified}</div>
                    </div>
                `;

                document.getElementById('message-input-field').style.display = "grid";;
                /*document.getElementById('account-details').textContent = JSON.stringify({
                    displayName: displayName,
                    email: email,
                    emailVerified: emailVerified,
                    phoneNumber: phoneNumber,
                    photoURL: photoURL,
                    uid: uid,
                    accessToken: accessToken,
                    providerData: providerData
                }, null, "");*/
            });
        } else {
            // User is signed out.
            document.getElementById('sign-in').innerHTML = "";
            let uiConfig = {
                signInSuccessUrl: "https://kyojingames.com/demos/firebase_example/",
                signInOptions: [
                    // Leave the lines as is for the providers you want to offer your users.
                    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                ],
                // tosUrl and privacyPolicyUrl accept either url string or a callback
                // function.
                // Terms of service url/callback.
                tosUrl: () => {
                    alert("Boilerplate TOS. Software provided as is. I tiake responsibility for nothing.");
                },
                // Privacy policy url/callback.
                privacyPolicyUrl: () => {
                    alert("Don't put personal stuff in this example.");
                }
            };
            // Initialize the FirebaseUI Widget using Firebase.
            let ui = new firebaseui.auth.AuthUI(firebase.auth());
            // The start method will wait until the DOM is loaded.

            ui.start('#sign-in', uiConfig);

            document.getElementById('account-details').textContent = '';
            document.getElementById('message-input-field').style.display = "none";
        }
    }, function (error) {
        console.log(error);
    });
};