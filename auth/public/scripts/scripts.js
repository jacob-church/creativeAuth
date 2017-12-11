
window.onload=function()
{
initApp();

}





function initApp(){
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
        }
	 else {
	console.log('no user');
	//window.location='/index.html';
         };

})
}

function logOut()
{
firebase.auth().signOut();
console.log("sign out");
}


function emailSignIn(){
  console.log('in sign in')
  if(!firebase.auth().currentUser){
    firebase.auth().signInWithEmailAndPassword(document.getElementById('emailSignIn').value, document.getElementById('pwdSignIn').value).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorCode)  // ...
  });}
    else{
firebase.auth().signOut();
console.log('out')
}

}


function emailSignUp()
{
if(!firebase.auth().currentUser)
{firebase.auth().createUserWithEmailAndPassword(document.getElementById('email').value, document.getElementById('pwd').value).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  alert(errorMessage);// ...
});
}
else{
firebase.auth().signOut();
console.log('out')
}
}


function googleSign()
{
if(!firebase.auth().currentUser){
var provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
console.log(user);;
  // ...
}).catch(function(error) {
  // Handle Errors here.
var errorCode = error.code;
console.log(errorCode)
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});

}
else
{

firebase.auth().signOut();
console.log('out')
}
}
