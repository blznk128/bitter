$.get("/api/user_data").then(function(data) {
    $("#user").text(" " + data.id);
    
  });

const userBit = $("#textarea1");
const allBitsDisplay = $("#allBits");

$(document).on("click", "button.delete", deleteBit);

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
    addBit(newBit)
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
    "<span class='card-title'>" + allBits[i].User.email + "</span>" + "<p>" + allBits[i].bit + "<button class = 'delete'>" + " X" + "</button>" + "</p>" + "</div>" + "</div>" + "</div>" + "</div>")
  }
})
}

function deleteBit() {
  let bitId = $(this).parent().parent().parent().parent().attr("id")
  console.log(bitId)
  $.ajax({
    method: "DELETE",
    url: "/api/deleteBit/" + bitId
  })
}

getThemBits()