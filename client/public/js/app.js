var restaurant_url = "http://127.0.0.1:8080/restaurants";
var restaurant_array = []; // This creates an empty restaurant array

var restaurant_count = 0;
var currentRestaurantIndex = 0;
var currentReviewIndex = 0;
var review_url = "http://127.0.0.1:8080/reviews";
var review_array = []; // This creates an empty review array

var whiteStarImage = 'images/websiteImages/white_star.png';
var yellowStarImage = 'images/websiteImages/yellow_star.png';

var whiteDollarSignImage = 'images/websiteImages/white_dollar_sign.png';
var greenDollarSignImage = 'images/websiteImages/green_dollar_sign.png';

var rating = 0;
var price = 0;
var tempRating = 0;

var login_url = "http://127.0.0.1:8080/login";

if (localStorage.getItem("login_userId")) {
    var login_userId = localStorage.getItem("login_userId");
}

function togglePasswordVisibility(element) {
    if(element.type == "password") {
        element.type = "text";
    }
    else {
        element.type = "password"
    }
}

function changeActiveNavItem(navItem) {
    document.getElementsByClassName("active")[0].classList.remove("active");
    document.getElementById(navItem).classList.add("active");
}