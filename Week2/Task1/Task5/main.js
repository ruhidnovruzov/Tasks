var currentIndex = 0;
var images = [];

fetch("https://api.npoint.io/3a2273dee986e879a38c")
  .then((response) => response.json())
  .then((data) => {
    images = data.map((item) => item.image);
    updateImage();
  })
  .catch((err) => console.error("Error fetching images:", err));

function prevImage() {
  if (currentIndex === 0) {
    currentIndex = images.length - 1;
  } else {
    currentIndex--;
  }
  updateImage();
}

function nextImage() {
  if (currentIndex === images.length - 1) {
    currentIndex = 0;
  } else {
    currentIndex++;
  }
  updateImage();
}

function updateImage() {
  var image = document.getElementById("carouselImage");
  image.src = images[currentIndex];
}
