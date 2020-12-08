$(document).ready(function() {
    M.updateTextFields();
  });

var loginForm = $("form.login");
const emailInput = $("#email");
const passwordInput = $("#password");

// loginForm.on("submit", function(event) {
//   event.preventDefault();
//   var userData = {
//     email: emailInput.val().trim(),
//     password: passwordInput.val().trim()
//   };

//   // if (!userData.email || !userData.password) {
//   //   return;
//   // }

//   // If we have an email and password we run the loginUser function and clear the form
//   loginUser(userData.email, userData.password);
//   emailInput.val("");
//   passwordInput.val("");
// });
function submitUser() {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
}

function loginUser(email, password) {
  $.post("/api/login", {
    email: email,
    password: password
  }).then(function(data) {
    window.location.replace(data);
  }).catch(function(err) {
    console.log(err);
  });
}