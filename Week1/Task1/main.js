function formatTime(date) {
  var day = String(date.getDate()).padStart(2, "0");
  var month = String(date.getMonth() + 1).padStart(2, "0");
  var year = date.getFullYear();
  var hours = String(date.getHours()).padStart(2, "0");
  var minutes = String(date.getMinutes()).padStart(2, "0");
  var seconds = String(date.getSeconds()).padStart(2, "0");
  return (
    day + "." + month + "." + year + " " + hours + ":" + minutes + ":" + seconds
  );
}

function updateClock() {
  var now = new Date();
  var formattedTime = formatTime(now);
  document.getElementById("clock").textContent = formattedTime;
}

updateClock();
setInterval(updateClock, 1000);
