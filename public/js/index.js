$(document).ready(function() {
    M.updateTextFields();
  });

let loginForm = $("form.login");
const emailInput = $("#email");
const passwordInput = $("#password");

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