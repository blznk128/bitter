$.get("/api/user_data").then(function(data) {
    $("#user").text(" " + data.id);
    
  });

const userBit = $("#textarea1");
const allBitsDisplay = $("#allBits")

function addBit(currentBit) {
  $.post("/api/saveBit", currentBit, () => {

  })
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
    location.reload().then(getThemBits())
    // location.href = "/members";
    
  });
};

function getThemBits() {
$.get("/api/getAllBits").then(function(allBits) {
  console.log(allBits)
  console.log(allBits[0].User.email)
  for (let i = 0; i < allBits.length;i++) {
    // allBitsDisplay.append("<p>" + allBits[i].bit)
    allBitsDisplay.append("<div class='row>'" + "<div class='col s12 m6'>" + "<div class='card blue-grey darken-1'>" + "<div class='card-content white-text'>" + 
    "<span class='card-title'>" + allBits[i].User.email + "</span>" + "<p>" + allBits[i].bit + "</p>" + "</div>" + "</div>" + "</div>" + "</div>")
  }
})
}

getThemBits()