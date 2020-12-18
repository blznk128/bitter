$.get("/api/user_data").then(function(data) {
    $("#user").text(" " + data.id);
    
  });

const userBit = $("#textarea1");
const allBitsDisplay = $("#allBits");
let editingBit = false;
let selectedBitId;

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
      console.log("this is bit",newBit)
      console.log("this is bit 2",selectedBitId)
    } else  {
      addBit(newBit)
    }
    


    // location.reload()
    // location.href = "/members";
    
  });
};

function getThemBits() {
$.get("/api/getAllBits").then(function(allBits) {
  console.log(allBits)
  console.log(allBits[0].User.email)
  for (let i = 0; i < allBits.length;i++) {
    // allBitsDisplay.append("<p>" + allBits[i].bit)
    allBitsDisplay.append("<div id=" + allBits[i].id + " " + "class='row>'" + "<div class='col s12 m6'>" + "<div class='card blue-grey darken-1'>" + "<div class='card-content white-text'>" + 
    "<span class='card-title'>" + allBits[i].User.email + "</span>" + "<p>" + allBits[i].bit + "<button class = 'delete'>" + " X" + "</button>" + "<button id=" + allBits[i].id + " " + "class = 'edit'>" + "edit" + "</button>" +
    "</p>" + "</div>" + "</div>" + "</div>" + "</div>")
  }
})
}

function deleteBit() {
  let bitId = $(this).parent().parent().parent().parent().attr("id")
  console.log(bitId)
  $.ajax({
    method: "DELETE",
    url: "/api/deleteBit/" + bitId
  }).then(setTimeout(function(){ location.reload() }, 2000))
}

function editBit() {
  let editBitId = $(this).attr("id")
  getSelectedBit(editBitId)
}

function getSelectedBit(id) {
  $.get("/api/bits/" + id, function(data) {
    console.log(data.id)
    // userBit.text(data.bit)
    if(data) {
      selectedBitId = data.id
      userBit.val(data.bit);
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