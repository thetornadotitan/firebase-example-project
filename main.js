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
    const messagesRefLimited = messagesRef.limitToLast(10)

    const messagesConsole = document.getElementById('messagesConsole');
    const messagesConsoleContainer = document.getElementById('messagesConsoleContainer');
    const messageText = document.getElementById('messageText');
    const messageButton = document.getElementById('messageBtn');

    messagesRefLimited.on('value', (snapshot) => {
        messagesConsole.innerHTML = '';
        const messages = snapshot.val();
        const keys = Object.keys(messages);
        for (let i = 0; i < keys.length; i++) {
            let k = keys[i];
            let name = messages[k].name;
            let message = messages[k].message;
            let messagediv = document.createElement("div");
            messagediv.className = "messagesConsolemessage";
            messagediv.appendChild(document.createTextNode(`${name} :`));
            messagediv.appendChild(document.createElement("br"));
            messagediv.appendChild(document.createTextNode(`${message}`));
            messagediv.appendChild(document.createElement("hr"));
            messagesConsole.appendChild(messagediv);
        }
        messagesConsoleContainer.scrollTop = messagesConsoleContainer.scrollHeight;
    });

    messageButton.onclick = (e) => {
        if (messageText.value != null && messageText.value != '') {
            messagesRef.push({ "name": firebase.auth().currentUser.displayName + "", "message": messageText.value + "" });
            messageText.value = '';
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

// Use the browser's built-in functionality to quickly and safely escape
// the string
function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}

// UNSAFE with unsafe strings; only use on previously-escaped ones!
function unescapeHtml(escapedStr) {
    var div = document.createElement('div');
    div.innerHTML = escapedStr;
    var child = div.childNodes[0];
    return child ? child.nodeValue : '';
}

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