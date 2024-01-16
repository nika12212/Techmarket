document.addEventListener('DOMContentLoaded', function () {
  const searchForm = document.getElementById('searchForm');
  const searchInput = document.getElementById('searchInput');
  const resultsDiv = document.getElementById('results');
  const itemsDiv = document.querySelector('.items');

 const products = [
            {
              name: "Samsung Galaxy A34",
              image: "../images/0188219_samsung-galaxy-a34-5g-a346eds-6128gb-graphite_550.webp",
              screenSize: "6.6 inches",
              ram: "6 GB",
              price: "650 ₾"
            },
            {
              name: "Samsung Galaxy S23 FE",
              image: "../images/S23.webp",
              screenSize: "6.4 inches",
              ram: "8 GB",
              price: "1649 ₾"
            },
            {
              name: "Samsung Galaxy S23 Ultra",
              image: "../images/0186120_samsung-galaxy-s23-ultra-5g-s918bds-12256gb-phantom-black_550.webp",
              screenSize: "6.8 inches",
              ram: "12 GB",
              price: "2600 ₾"
            },
            {
              name: "Apple iPhone 15 Pro",
              image: "../images/cb67fff2-633b-479b-9c63-12e72f6f786c_Thumb.webp",
              screenSize: "6.6 inches",
              ram: "6 GB",
              price: "3650 ₾"
            },
            {
              name: "Apple Macbook Air 13",
              image: "../images/0144415_apple-macbook-air-13-inch-2020-mgn93lla-m1chipset8gb256gb-ssd-silver-apple-m15nm-apple-7-core-gpu-8g_550.webp",
              gpuModel: "Apple 7-core GPU",
              ram: "8 GB",
              price: "2550 ₾"
            },
            {
              name: "Asus VivoBook 15 ",
              image: "../images/0195799_asus-vivobook-15-x1504va-bq281-blue_550.webp",
              processorType: "Intel Core i3",
              screenSize: "15.6 inch",
              gpuModel: "Intel UHD Graphics",
              ram: "8 GB",
              price: "1650 ₾"
            },
            {
              name: "Lenovo Legion S7 82TF007GRK, Intel Core i7-12700H 2.3 Ghz, NVIDIA Geforce RTX 3050 Ti 4GB, 16GB RAM SSD 512GB, Free Dos, ლეპტოპი",
              image: "../images/0181404_lenovo-legion-s7-82tf007grk-intel-core-i7-12700h-23-ghz-nvidia-geforce-rtx-3050-ti-4gb-16gb-ram-ssd-_550.webp",
              screenSize: "16 inch",
              resolution: "1920x1200",
              processorType: "Intel Core i7",
              price: "650 ₾"
            },
            {
              name: "Apple Watch Ultra ",
              image: "../images/0182064_apple-watch-ultra-49mm-titanium-blackgrey-trail-loop-mqf43-sm_550.webp",
              screenSize: "1.92 inches",
              os: "watchOS 9.0",
              simType: "e-SIM",
              size: "S/M",
              weight: "61.3 g",
              price: "650 ₾"
            },
            {
              name: "Asus ROG Ally RC71L Z1",
              image: "../images/58d2ef74-8ce1-416f-8058-ae05779ba13e_Thumb.webp",
              screenSize: "7 inches",
              refreshRate: "120Hz",
              storage: "512GB",
              processor: "AMD Ryzen Z1",
              price: "2550 ₾"
            },
            {
              name: "Marshall Motif II ANC ",
              image: "../images/6afc6740-d8d2-4345-81ec-559c69b79fc1_Thumb.webp",
              brand: "Marshall",
              playbackTime: "6 hours (ANC on), 9 hours (ANC off)",
              chargingTime: "15 minutes gives 1 hour of playtime",
              frequencyRange: "20 Hz - 20 kHz",
              price: "800 ₾"
            },
            {
              name: "Apple iPad Pro 11",
              image: "../images/0182436_apple-ipad-pro-11-2022-4th-gen-128gb-wi-fi-silver_550.webp",
              internalStorage: "128 GB",
              ram: "8 GB",
              screenSize: "11 inches",
              os: "iPadOS 16.1",
              price: "2700 ₾"
            }
          ];

  searchForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const query = searchInput.value.toLowerCase();
      const results = products.filter(product => product.name.toLowerCase().includes(query));
      displayResults(results);
  });

  function displayResults(results) {
      resultsDiv.innerHTML = '<h2 style="margin-left: 30px; margin-top:120px;">Searching Results:</h2>';
      
      if (results.length > 0) {
          const selectedItem = results[0];
          const selectedItemCard = createProductCard(selectedItem);
          itemsDiv.innerHTML = '';
          itemsDiv.appendChild(selectedItemCard);
          addAddToCartListener(selectedItemCard, selectedItem);
      }
  }

  function createProductCard(product) {
      const productCard = document.createElement('div');
      productCard.innerHTML = `
          <div class="card" style="width: 18rem;">
              <img src="${product.image}" class="card-img-top" alt="...">
              <div class="card-body">
                  <h5 class="card-title">${product.name}</h5>
                  <br>
                  <p class="card-text" style="font-size: 25px;"><b>ფასი : ${product.price}</b></p>
                  <br>
                  <a href="#" class="btn btn-primary addToCartBtn">Add to card</a>
              </div>
          </div>
      `;
      return productCard;
  }

  
});
