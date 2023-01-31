function fetchReviews() {
  var request = new XMLHttpRequest();

  request.open("GET", review_url, true);

  //This command starts the calling of the comments api
  request.onload = function () {
    //get all the comments records into our comments array
    review_array = JSON.parse(request.responseText);
    review_array_string = JSON.stringify(review_array);
    localStorage.setItem("review_array_string", review_array_string);
    showReviews();
  };
  request.send();
}

function addToFavourites() {
  alert('add');
  if(sessionStorage.getItem("user_login") == "false") {
    alert("Please login first to add to favourites.");
    return;
  }
  var user_info_array = JSON.parse(sessionStorage.getItem("user_info_string"));
  var favourite = {
    userId: user_info_array[0]._id,
    restaurantId: currentRestaurantIndex
  };
  fetch("http://127.0.0.1:8080/favourites", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(favourite),
  })
  .then((res) => {
    if (res.ok) {
      alert('This restaurant is successfully added to favourites.');
      return res.json();
    } else {
      alert("Cannot add to favourites. An error occurred.");
      throw "An error occurred.";
    }
  })
  .catch((error) => {
    console.error("Error:", error);
  });
}

function showRestaurantDetails() {
  var currentRestaurant = restaurant_array[currentRestaurantIndex];
  var htmlRestaurantDetails =
    '<div class="px-4 py-2 row"><div class="col-md-12"><a href="../index.html">Home</a> > <a href="../explore.html">Explore</a> > <a href="../restaurants.html">Restaurants</a> > ' +
    currentRestaurant.restaurantName;
  htmlRestaurantDetails +=
    '<br><h4 style="text-decoration: underline; display: inline-block;" class="p-1 py-3">' +
    currentRestaurant.restaurantName +
    '</h4> \
    <span class="badge rounded-pill border border-warning text-warning">' +
    currentRestaurant.category;
  htmlRestaurantDetails +=
    '</span>\
    <b style="display: block; margin-left: 17px">Description</b><md-block style="line-height: 1.8">' +
    currentRestaurant.description +
    '</md-block> \
    <li style="margin-left: 16px; margin-top: -12px; display: inline"><span style="margin-left: 3px">Rating: </span></li>';
  var yellow_stars = currentRestaurant.averageRating;
  var green_dollars = currentRestaurant.averagePrice;
  var white_stars = 0;
  if (yellow_stars < 5) {
    white_stars = 5 - yellow_stars;
  }
  for (let j = 0; j < yellow_stars; j++) {
    htmlRestaurantDetails +=
      '<img src="images/websiteImages/yellow_star.png" width="18px" height="18px" class="mx-1"/>';
  }
  for (let j = 0; j < white_stars; j++) {
    htmlRestaurantDetails +=
      '<img src="images/websiteImages/white_star.png" width="18px" height="18px" class="mx-1"/>';
  }
  htmlRestaurantDetails += " / ";
  var white_dollars = 0;
  if (green_dollars < 5) {
    white_dollars = 5 - green_dollars;
  }
  for (let j = 0; j < green_dollars; j++) {
    htmlRestaurantDetails +=
      '<img src="images/websiteImages/green_dollar_sign.png" width="18px" height="18px" class="mx-1"/>';
  }
  for (let j = 0; j < white_dollars; j++) {
    htmlRestaurantDetails +=
      '<img src="images/websiteImages/white_dollar_sign.png" width="18px" height="18px" class="mx-1"/>';
  }
  htmlRestaurantDetails +=
    '</div></div><div class="row px-5 py-2"><div class="col-md-3"><img src="images/websiteImages/Icon feather-phone.png" width="20px" height="20px" class="mx-2">' +
    currentRestaurant.restaurantContact +
    '<br><div class="mx-2 mt-3"><img src="images/websiteImages/Icon awesome-external-link-alt.png" width="20px" height="20px"><a target="_blank" style="margin-left:10px" href="' +
    currentRestaurant.websiteLink +
    '">Visit website</a></div><div class="mx-2 mt-3"><img src="images/websiteImages/Icon map-food.png" width="20px" height="20px"><a target="_blank" style="margin-left:10px" href="' +
    currentRestaurant.menuLink +
    '">See menu</a></div></div><div class="col-md-4"><img src="images/websiteImages/Icon material-location-on.png" width="15px" height="20px" class="mx-2">' +
    currentRestaurant.location +
    '<br><div class="mt-3"><img src="images/websiteImages/Icon feather-clock.png" width="20px" height="20px" class="mx-2">' +
    currentRestaurant.openingHours +
    '</div></div></div><div class="m-4 text-center"><i>Highlights</i></div><div id="restaurantImgCarousel" class="carousel slide text-center mb-3" data-ride="carousel"><div class="carousel-inner"><div class="carousel-item active"><img class="restaurantImg" src="' +
    currentRestaurant.image1 +
    '"></div><div class="carousel-item"><img class="restaurantImg" src="' +
    currentRestaurant.image2 +
    '"></div><div class="carousel-item"><img class="restaurantImg" src="' +
    currentRestaurant.image3 +
    '"></div></div><a class="carousel-control-prev" href="#restaurantImgCarousel" role="button" data-slide="prev"><img src="images/websiteImages/Icon ionic-ios-arrow-dropleft.png" width="30px" height="30px"></a><a class="carousel-control-next" href="#restaurantImgCarousel" role="button" data-slide="next"><img src="images/websiteImages/Group 59.png" width="30px" height="30px"></a></div></div>';
  document.getElementById("restaurantDetails").textContent = "";
  document
    .getElementById("restaurantDetails")
    .insertAdjacentHTML("beforeend", htmlRestaurantDetails);
}

//This function is to display all the comments of that movie
//whenever the user click on the "comment" button
function showReviews() {
  restaurant_array = JSON.parse(
    localStorage.getItem("restaurant_array_string")
  );
  currentRestaurantIndex = JSON.parse(
    localStorage.getItem("currentRestaurantIndex")
  );
  showRestaurantDetails();
  document.getElementById("reviewContent").textContent = "";
  var reviewCount = 0;
  for (var i = 0; i < review_array.length; i++) {
    if (
      review_array[i].restaurantId ==
      restaurant_array[currentRestaurantIndex]._id
    ) {
      reviewCount += 1;
      document.getElementById("emptyReview").innerHTML = "";
      star = "";
      var htmlReviews =
        '<div class="container"> \
            <div class="row d-flex justify-content-center align-items-center"> \
            <div class="col-md-1"><img src="' +
        review_array[i].userPhoto +
        '"/ width="50px" height="50px" style="object-fit: cover" class="rounded-circle"><br><div>' +
        review_array[i].userName +
        '</div></div> \
            <div class="col-md-10"><div>' +
        review_array[i].postedTime +
        '</div> \
            <div id="rating' +
        i +
        '">Rating: ';
      var yellow_stars = review_array[i].rating;
      var white_stars = 0;
      if (yellow_stars < 5) {
        white_stars = 5 - yellow_stars;
      }
      for (let j = 0; j < yellow_stars; j++) {
        htmlReviews +=
          '<img src="images/websiteImages/yellow_star.png" width="18px" height="18px" class="mx-1"/>';
      }
      for (let j = 0; j < white_stars; j++) {
        htmlReviews +=
          '<img src="images/websiteImages/white_star.png" width="18px" height="18px" class="mx-1"/>';
      }
      htmlReviews += '</div><div id="price' + i + '">Price: &nbsp;&nbsp;&nbsp;';
      var green_dollars = review_array[i].price;
      var white_dollars = 0;
      if (green_dollars < 5) {
        white_dollars = 5 - green_dollars;
      }
      for (let j = 0; j < green_dollars; j++) {
        htmlReviews +=
          '<img src="images/websiteImages/green_dollar_sign.png" width="18px" height="18px" class="mx-1"/>';
      }
      for (let j = 0; j < white_dollars; j++) {
        htmlReviews +=
          '<img src="images/websiteImages/white_dollar_sign.png" width="18px" height="18px" class="mx-1"/>';
      }
      htmlReviews +=
        "</div><div><b><i>" +
        review_array[i].title +
        "</i></b></div> \
            <div>" +
        review_array[i].comment +
        "</div>";
      htmlReviews +=
        '</div> \
            <div class="col-md-1"><img src="images/websiteImages/Icon feather-edit.png" item="' +
        i +
        '" width="25px" height="25px" data-toggle="modal" data-target="#editReviewModal" data-dismiss="modal" onclick="editReview(this)"/> <img src="images/websiteImages/delete(1).png" item="' +
        i +
        '" width="25px" height="25px" onclick="deleteReview(this)"/></div>\
            </div></div><hr>';
      document
        .getElementById("reviewContent")
        .insertAdjacentHTML("beforeend", htmlReviews);
    }
  }
  document.getElementById("review").textContent =
    "Reviews (" + reviewCount + ")";
}

function newReview() {
  //Initialise each HTML input elements in the modal window with default value.
  rateIt(document.getElementById("star"));
  rateIt(document.getElementById("dollar"));
  document.getElementById("userId").value = "";
  document.getElementById("title").value = "";
  document.getElementById("comment").value = "";
}

// Submit or send the new comment to the server to be added.
function addReview() {
  var review = new Object();
  review.restaurantId = restaurant_array[currentRestaurantIndex]._id; // Movie ID is required by server to create new comment
  review.userId = document.getElementById("userId").value; // Value from HTML input text
  review.title = document.getElementById("title").value; // Value from HTML input text
  review.comment = document.getElementById("comment").value; // Value from HTML input text
  review.datePosted = null; // Change the datePosted to null instead of taking the timestamp on the client side;
  review.rating = rating;
  review.price = price;

  var postReview = new XMLHttpRequest(); // new HttpRequest instance to send comment

  postReview.open("POST", review_url, true); //Use the HTTP POST method to send data to server

  postReview.setRequestHeader("Content-Type", "application/json");
  postReview.onload = function () {
    console.log("new review sent");
    fetchReviews(); // fetch all comments again so that the web page can have updated comments.
  };
  // Convert the data in Comment object to JSON format before sending to the server.
  postReview.send(JSON.stringify(review));
  console.log(postReview);
}

//This function allows the user to mouse hover the black and white popcorn
//so that it will turn to a colored version when hovered
function rateIt(element) {
  var value = element.getAttribute("data-value");
  var className = element.getAttribute("class");
  var collection = document.getElementsByClassName(className);
  var classTarget = "." + className;
  var setImage;
  var setImageBack;
  if (className == "star" || className == "editStar") {
    setImage = yellowStarImage;
    setImageBack = whiteStarImage;
  } else {
    setImage = greenDollarSignImage;
    setImageBack = whiteDollarSignImage;
  }
  for (let image of collection) {
    image.setAttribute("src", setImageBack);
  }
  changeRatingImages(value, classTarget, setImage);
}

// This function sets the rating and coloured images based on the value of the image tag when
// the mouse cursor hovers over the popcorn image.
function changeRatingImages(value, classTarget, setImage) {
  switch (eval(value)) {
    case 1:
      document
        .querySelector(classTarget + "[data-value='1']")
        .setAttribute("src", setImage);
      tempRating = 1;
      break;
    case 2:
      document
        .querySelector(classTarget + "[data-value='1']")
        .setAttribute("src", setImage);
      document
        .querySelector(classTarget + "[data-value='2']")
        .setAttribute("src", setImage);
      tempRating = 2;
      break;
    case 3:
      document
        .querySelector(classTarget + "[data-value='1']")
        .setAttribute("src", setImage);
      document
        .querySelector(classTarget + "[data-value='2']")
        .setAttribute("src", setImage);
      document
        .querySelector(classTarget + "[data-value='3']")
        .setAttribute("src", setImage);
      tempRating = 3;
      break;
    case 4:
      document
        .querySelector(classTarget + "[data-value='1']")
        .setAttribute("src", setImage);
      document
        .querySelector(classTarget + "[data-value='2']")
        .setAttribute("src", setImage);
      document
        .querySelector(classTarget + "[data-value='3']")
        .setAttribute("src", setImage);
      document
        .querySelector(classTarget + "[data-value='4']")
        .setAttribute("src", setImage);
      tempRating = 4;
      break;
    case 5:
      document
        .querySelector(classTarget + "[data-value='1']")
        .setAttribute("src", setImage);
      document
        .querySelector(classTarget + "[data-value='2']")
        .setAttribute("src", setImage);
      document
        .querySelector(classTarget + "[data-value='3']")
        .setAttribute("src", setImage);
      document
        .querySelector(classTarget + "[data-value='4']")
        .setAttribute("src", setImage);
      document
        .querySelector(classTarget + "[data-value='5']")
        .setAttribute("src", setImage);
      tempRating = 5;
      break;
  }
  if (classTarget == ".dollar" || classTarget == ".editDollar") {
    price = tempRating;
    console.log("price" + price);
  } else {
    rating = tempRating;
    console.log("rating" + rating);
  }
}

//This function will hide the existing modal and present a modal with the selected comment
//so that the user can attempt to change the username, rating or movie review
function editReview(element) {
  currentReviewIndex = element.getAttribute("item");
  document.getElementById("editUserId").value =
    review_array[currentReviewIndex].userId;
  document.getElementById("editTitle").value =
    review_array[currentReviewIndex].title;
  document.getElementById("editComment").value =
    review_array[currentReviewIndex].comment;
  displayRating("editStar", review_array[currentReviewIndex].rating);
  displayRating("editDollar", review_array[currentReviewIndex].price);
}

//This function displayS the correct number of colored popcorn
//based on the movie rating that is given in the user comment
function displayRating(className, value) {
  var collection = document.getElementsByClassName(className);
  var classTarget = "." + className;
  if (className == "editStar") {
    setImage = yellowStarImage;
    setImageBack = whiteStarImage;
  } else {
    setImage = greenDollarSignImage;
    setImageBack = whiteDollarSignImage;
  }
  for (let image of collection) {
    image.setAttribute("src", setImageBack);
  }
  changeRatingImages(value, classTarget, setImage);
}

//This function sends the Comment data to the server for updating
function updateReview() {
  var response = confirm("Are you sure you want to update this comment?");
  if (response == true) {
    var edit_review_url =
      review_url + "/" + review_array[currentReviewIndex]._id;
    var updateReview = new XMLHttpRequest(); // new HttpRequest instance to send request to server
    updateReview.open("PUT", edit_review_url, true); //The HTTP method called 'PUT' is used here as we are updating data
    updateReview.setRequestHeader("Content-Type", "application/json");
    review_array[currentReviewIndex].userId =
      document.getElementById("editUserId").value;
    review_array[currentReviewIndex].title =
      document.getElementById("editTitle").value;
    review_array[currentReviewIndex].comment =
      document.getElementById("editComment").value;
    review_array[currentReviewIndex].rating = rating;
    review_array[currentReviewIndex].price = price;
    updateReview.onload = function () {
      fetchReviews();
    };
    updateReview.send(JSON.stringify(review_array[currentReviewIndex]));
  }
}

//This function deletes the selected comment in a specific movie
function deleteReview(element) {
  var response = confirm("Are you sure you want to delete this comment?");
  if (response == true) {
    var item = element.getAttribute("item"); //get the current item
    var delete_review_url = review_url + "/" + review_array[item]._id;
    var eraseReview = new XMLHttpRequest();
    eraseReview.open("DELETE", delete_review_url, true);
    eraseReview.onload = function () {
      fetchReviews();
    };
    eraseReview.send();
  }
}