var restaurant_url = "http://localhost:8080/restaurants";
var restaurant_array = []; // This creates an empty movie array
var restaurant_count = 0;
/*  There are two categories: "Now Showing" and "Coming Soon". This variable states which 
    category of movies should be listed when the home page is first loaded. */
var category = "Now Showing";
var currentRestaurantIndex = 0;
var currentReviewIndex = 0;
var review_url = "http://localhost:8080/reviews";
var review_array = []; // This creates an empty comment array

var whiteStarImage = 'images/websiteImages/white_star.png';
var yellowStarImage = 'images/websiteImages/yellow_star.png';

var whiteDollarSignImage = 'images/websiteImages/white_dollar_sign.png';
var greenDollarSignImage = 'images/websiteImages/green_dollar_sign.png';

var rating = 0;
var price = 0;
var tempRating = 0;

var login_url = "http://localhost:8080/login";

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