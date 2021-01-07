const userBit = $("#textarea1");
const allBitsDisplay = $("#allBits");
let editingBit = false;
let selectedBitId;
let loggedInUser;

$.get("/api/user_data").then(function(data) {
  loggedInUser = data.id
  $("#user").text(" " + data.email);
});

$(document).on("click", "button.delete", deleteBit);
$(document).on("click", "button.edit", editBit)

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

function deleteBit() {
  let bitUserId = $(this).parent().attr("id")
  let bitId = $(this).parent().parent().parent().parent().attr("id")
  if(loggedInUser == bitUserId){
  $.ajax({
    method: "DELETE",
    url: "/api/deleteBit/" + bitId
  }).then(setTimeout(function(){ location.reload() }, 2000))
}
}

function editBit() {
  let editBitId = $(this).attr("id")
  getSelectedBit(editBitId)
}

function getSelectedBit(id) {
  $.get("/api/bits/" + id, function(selectedBit) {
    selectedBitId = selectedBit.id
    if(loggedInUser === selectedBit.UserId) {
      userBit.val(selectedBit.bit);
      editingBit = true
    }
  })
}

//sending the new update
function updateBit(updatingBit){
  $.ajax({
    method: "PUT",
    url: "/api/getAllBits",
    data: updatingBit
  })
}

getThemBits()