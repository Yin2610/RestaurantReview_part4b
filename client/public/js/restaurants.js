//This function is to call the restaurants api and get all the restaurants
function getRestaurantData() {
  var request = new XMLHttpRequest();
  request.open("GET", restaurant_url, true);
  //This function will be called when data returns from the web api
  request.onload = function () {
    //get all the restaurant records into our restaurant array
    restaurant_array = JSON.parse(request.responseText);
    restaurant_array_string = JSON.stringify(restaurant_array);
    localStorage.setItem("restaurant_array_string", restaurant_array_string);
    console.log(localStorage.getItem("restaurant_array_string"));
    displayRestaurants();
  };

  //This command starts the calling of the restaurants web api
  request.send();
}

function goToReviews(element) {
  currentRestaurantIndex = element.getAttribute("item");
  localStorage.setItem("currentRestaurantIndex", currentRestaurantIndex);
  window.location.href = "reviews.html";
}

function displayRestaurants() {
  var table = document.getElementById("restaurantsTable");

  table.innerHTML = "";
  totalRestaurants = restaurant_array.length;
  for (var i = 0; i < totalRestaurants; i++) {
    var image = restaurant_array[i].image1;
    var name = restaurant_array[i].restaurantName;
    var town = restaurant_array[i].town;
    var cuisine = restaurant_array[i].category;
    var yellow_stars = restaurant_array[i].averageRating;
    var green_dollars = restaurant_array[i].averagePrice;
    var totalReviews = restaurant_array[i].totalReviews;
    var cell =
      '<div class="col-md-4"><div class="card h-100"><img class="card-img img-fluid" src="' +
      image +
      '" alt="Restaurant image" style="width: 100%; height: 130px; object-fit: cover">\
                    <div class="card-body" item="'+ i + '" onClick="goToReviews(this)"><h5 class="card-title">' +
      name +
      "</h5><div>" +
      town +
      '</div>';
    var white_stars = 0;
    if(yellow_stars < 5) {
        white_stars = 5 - yellow_stars;
    }
    cell += '<div id="rating' + i + '">Rating: ';
    for (let j = 0; j < yellow_stars; j++) {
        cell += '<img src="images/websiteImages/yellow_star.png" width="18px" height="18px" class="mx-1"/>';
    }
    for (let j = 0; j < white_stars; j++) {
        cell += '<img src="images/websiteImages/white_star.png" width="18px" height="18px" class="mx-1"/>';
    }
    cell += '</div>';
    cell += '<div id="price' + i + '">Price: &nbsp;&nbsp;&nbsp;';
    var white_dollars = 0;
    if(green_dollars < 5) {
        white_dollars = 5 - green_dollars;
    }
    for (let j = 0; j < green_dollars; j++) {
        cell += '<img src="images/websiteImages/green_dollar_sign.png" width="18px" height="18px" class="mx-1"/>';
    }
    for (let j = 0; j < white_dollars; j++) {
        cell += '<img src="images/websiteImages/white_dollar_sign.png" width="18px" height="18px" class="mx-1"/>';
    }'</div>';
    cell += '<br><div><img src="images/websiteImages/totalReviews.png"/> '+ totalReviews; 
    if(totalReviews < 2) {
      cell += ' review</div>';
    }
    else {
      cell += ' reviews</div>';
    }
    cell += '<div class="badge rounded-pill border border-warning text-warning">' +
    cuisine +
    '</div></div></div>';
    table.insertAdjacentHTML("beforeend", cell);
  }
  document.getElementById("parent").textContent = "";
}

function filterRestaurants() {
  let checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
  let regionValues = [];
  let categoryValues = [];
  checkboxes.forEach((checkbox) => {
    if(checkbox.name == "Region") {
      regionValues.push(checkbox.value);
    }
    else {
      categoryValues.push(checkbox.value);
    }
  });
  var filterURL = "http://127.0.0.1:8080/restaurants?";
  if(regionValues.length) {
    filterURL += "region=";
    filterURL += regionValues.join(",");
  }
  if(categoryValues.length) {
    if(regionValues.length) {
      filterURL += "&category=";
    }
    else {
      filterURL += "category=";
    }
    filterURL += categoryValues.join(",");
  }
  fetch(filterURL, {
    method: 'GET'
  })
  .then(res => {
    if(res.ok) {
      return res.json();
    }
    else {
      alert("Cannot filter.");
      throw "Cannot filter.";
    }
  })
  .then((data) => {
    if(data.length) {
      restaurant_array = data;
      displayRestaurants();
    }
    else {
      document.getElementById("restaurantsTable").innerHTML = "<div class='ml-3'>No restaurant found for this search.</div>";
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  }); 
}

function cancelFilter() {
  restaurant_array = JSON.parse(localStorage.getItem("restaurant_array_string"));   //set back to all restaurants in restaurant_array
  document.querySelectorAll('input[type="checkbox"]:checked').forEach((checkbox) => {checkbox.checked = false;});
  displayRestaurants();
}

async function searchRestaurant() {
  var searchString = document.getElementById("searchString").value;
  var clearSearch = document.getElementById("clearSearch");
  if(searchString == "") {
    clearSearch.style.display = "none";
  }
  else {
    clearSearch.style.display = "block";
  }
  var searchURL = "http://localhost:8080/restaurants?searchString=" + searchString;
  const response = await fetch(searchURL, {
    method: "GET",
  });
  if(!response.ok) {
    throw new Error(`Search error. status: ${response.status}`);
  }
  const data = await response.json();
  if(data.length) {
    restaurant_array = data;
    displayRestaurants();
  }
  else {
    document.getElementById("restaurantsTable").innerHTML = "<div class='ml-3'>No restaurant found for this search.</div>";
  }
}