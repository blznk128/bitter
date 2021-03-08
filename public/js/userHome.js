const userBit = $("#textarea1");
const allBitsDisplay = $("#allBits");
const usersHolder = $("#allUsers")
const followerBits = $("#followerBits")
let theList = []
let editingBit = false;
let selectedBitId;
let loggedInUser;
let loggedInUserWithFavorites;

function getLoggedInUser(){
$.get("/api/user_data").then(function(data) {
  console.log(data)
  loggedInUserWithFavorites = data
  loggedInUser = data.id
  $("#user").text(" " + data.email);
  getUserAndSavedUsers()
});
}

getLoggedInUser()

$(document).on("click", "button.delete", deleteBit);
$(document).on("click", "button.edit", editBit)
$(document).on("click", "a.testOne", saveUser);

function addBit(currentBit) {
  $.post("/api/saveBit", currentBit, () => {

  }).then(getThemBits()).then(setTimeout(function(){ location.reload() }, 1000))
}

function submitBit() {
  event.preventDefault()
  $.get("/api/user_data").then(function(data) {
    console.log(data.id)
    let newBit = {
      bit: userBit.val(),
      UserId: data.id
    }
    if(editingBit){
      newBit.id = selectedBitId
      updateBit(newBit)
      setTimeout(function(){ location.reload() }, 2000)
    } else  {
      addBit(newBit)
    }
  });
};

function getThemBits() {
$.get("/api/getAllBits").then(function(allBits) {
  for (let i = 0; i < allBits.length;i++) {
    console.log(allBits[i].UserId)
    //make if/else statement*
    if(loggedInUser == allBits[i].UserId){
    allBitsDisplay.append("<div id=" + allBits[i].id + " " + "class='row>'" + "<div class='col s12 m6'>" + "<div class='card blue-grey darken-1'>" + "<div class='card-content white-text'>" + 
    "<span class='card-title'>" + allBits[i].User.email + "</span>" + "<p id=" + allBits[i].UserId + ">" + allBits[i].bit + "<button class = 'delete'>" + " X" + "</button>" + "<button id=" + allBits[i].id + " " + "class = 'edit'>" + "edit" + "</button>" +
    "</p>" + "</div>" + "</div>" + "</div>" + "</div>")
    } else  {
      allBitsDisplay.append("<div id=" + allBits[i].id + " " + "class='row>'" + "<div class='col s12 m6'>" + "<div class='card blue-grey darken-1'>" + "<div class='card-content white-text'>" + 
    "<span class='card-title'>" + allBits[i].User.email + "</span>" + "<p id=" + allBits[i].UserId + ">" + allBits[i].bit +  
    "</p>" + "</div>" + "</div>" + "</div>" + "</div>")
    }
  }
})
}

function getFollowerBits() {
  $.get("/api/getAllBits").then( function(userWithFavoriteUsers) {
    console.log("this is new:", userWithFavoriteUsers)
    for(let i = 0; i < userWithFavoriteUsers.length; i++) {
      let favoriteUserId = userWithFavoriteUsers[i].User.favoriteUser
      if(loggedInUser.favoriteUser == userWithFavoriteUsers[i].UserId){
        followerBits.append("<div id=" + userWithFavoriteUsers[i].id + " " + "class='row>'" + "<div class='col s12 m6'>" + "<div class='card blue-grey darken-1'>" + "<div class='card-content white-text'>" + 
    "<span class='card-title'>" + userWithFavoriteUsers[i].User.email + "</span>" + "<p id=" + userWithFavoriteUsers[i].UserId + ">" + userWithFavoriteUsers[i].bit +  
    "</p>" + "</div>" + "</div>" + "</div>" + "</div>")
      } else if(loggedInUser.id == userWithFavoriteUsers[i].UserId) {
        followerBits.append("<div id=" + userWithFavoriteUsers[i].id + " " + "class='row>'" + "<div class='col s12 m6'>" + "<div class='card blue-grey darken-1'>" + "<div class='card-content white-text'>" + 
        "<span class='card-title'>" + userWithFavoriteUsers[i].User.email + "</span>" + "<p id=" + userWithFavoriteUsers[i].UserId + ">" + userWithFavoriteUsers[i].bit + "<button class = 'delete'>" + " X" + "</button>" + "<button id=" + userWithFavoriteUsers[i].id + " " + "class = 'edit'>" + "edit" + "</button>" +
        "</p>" + "</div>" + "</div>" + "</div>" + "</div>")
      }
        
      
    }
  })
}

function deleteBit() {
  let bitUserId = $(this).parent().attr("id")
  let bitId = $(this).parent().parent().parent().parent().attr("id")
  
  if(loggedInUser.id == bitUserId){
  $.ajax({
    method: "DELETE",
    url: "/api/deleteBit/" + bitId
  }).then(setTimeout(function(){ location.reload() }, 2000))
}
}

function editBit() {
  let editBitId = parseInt($(this).attr("id"))

  console.log(editBitId )
  getSelectedBit(editBitId)
}

function getSelectedBit(id) {
  $.get("/api/bits/" + id, function(selectedBit) {
    console.log("this is selectedbit: ",selectedBit)
    console.log("this is selectedbit: ",loggedInUser.id)
    selectedBitId = selectedBit.id
    if(loggedInUser.id === selectedBit.UserId) {
      userBit.val(selectedBit.bit);
      editingBit = true
    }
  })
}

//getting user with theirs and saved users bits
function getUserAndSavedUsers(id){
$.get("/api/user_data").then(function(data) {
  console.log(data)
    loggedInUser = data
    followerBits.empty()
    getFollowerBits()
  });
}


//sending the new update
function updateBit(updatingBit){
  $.ajax({
    method: "PUT",
    url: "/api/getAllBits",
    data: updatingBit
  })
}

//get all users in database
function getAllUsers() {
  $.get("/api/getAllUsers").then(function(allUsers) {
    for( let i = 0; i < allUsers.length; i++) {
      usersHolder.append("<a id =" + allUsers[i].id + " href='#'" + " class='testOne'"+">" + allUsers[i].email + "</a>" + " ")
    }
  })
}

//user to be added to user favorite
function addUsertoUser(saveTheUser) {
  $.ajax({
    method: "PUT",
    url: "/api/user_data",
    data: saveTheUser
  }).then(getUserAndSavedUsers())
};

function getNewSavedUserBits() {
  $.get("/api/getAllBits").then(function(data){setTimeout(function(){console.log(data)}, 3000)})
}

//allBitsDisplay.append(loggedInUser)

//save user to account
function saveUser(currentBit) {
  const userClickedId = $(this).attr("id")
  currentUserId = parseInt(loggedInUser)
  let userToBeSaved = {
    favoriteUser: userClickedId,
    UserId: currentUserId
  }
  console.log(currentUserId)
  addUsertoUser(userToBeSaved)
  
}

getAllUsers()
// getUserAndSavedUsers()
// getFollowerBits()
