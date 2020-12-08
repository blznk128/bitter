$.get("/api/user_data").then(function(data) {
    $("#user").text(" " + data.id);
    
  });

const userBit = $("#textarea1")

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
  });
  
}