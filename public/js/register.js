const emailOfUser = $("#email");
const userPassword = $("#password");

function submitInfo() {
    event.preventDefault();
    let newUser = {
        email: emailOfUser.val(),
        password: userPassword.val()
    }
    storeNewUser(newUser)
    window.location.href = "/"
}

function storeNewUser(currentNewUser) {
    $.post("/api/newUser", currentNewUser, () => {

    })
}