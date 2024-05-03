fetch("https://api.npoint.io/3a2273dee986e879a38c")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    const container = document.getElementById("container");
    data.forEach(function (item) {
      var image = item.image;
      var name = item.name;
      var price = item.price;

      container.innerHTML += `
            <div class = "product"> 
                <img src="${image}" alt="product">
                <h2>${name}</h2> 
                <p>Qiymət: ${price} AZN</p>
            </div>
            `;

      console.log("Image:", image);
      console.log("Name:", name);
      console.log("Price:", price);
    });
  })
  .catch(function (err) {
    console.warn("Something went wrong.", err);
  });
