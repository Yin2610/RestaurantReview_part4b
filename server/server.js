const express = require("express"); //using the express web framework
const cors = require("cors");
const multer = require("multer");

var userController = require('./controllers/userController'); // set commentController to the commentController class
var restaurantController = require('./controllers/restaurantController'); // set movieController to the movieController class
var favouriteController = require('./controllers/favouriteController'); // set favouriteController to the favouriteController class
var reviewController = require('./controllers/reviewController'); // set reviewController to the reviewController class
var reviewLikeController = require('./controllers/reviewLikeController'); // set reviewLikeController to the reviewLikeController class
var groupController = require('./controllers/groupController'); // set groupController to the groupController class
var membershipController = require('./controllers/membershipController'); // set membershipController to the membershipController class
var articleController = require('./controllers/articleController'); // set articleController to the articleController class
var articleLikeController = require('./controllers/articleLikeController'); // set articleLikeController to the articleLikeController class
var articleReplyController = require('./controllers/articleReplyController'); // set articleReplyController to the articleReplyController class

var app = express(); // set variable app to be an instance of express framework. From now on, app is the express
app.use(cors());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(express.json()); // json() is a method inbuilt in express to recognize the incoming Request Object from the web client as a JSON Object.
// In time to come we will need to accept new or edited comments from user

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
});
var upload = multer({ storage: storage });

app.post('/register', upload.single('userPhoto'), function(req, res) {
    if(!req.file) {
        console.log("Cannot upload user picture.");
    }
    else {
        userController.addUser(req, res);
    }
});

app.route('/users').get(userController.getAllUsers); // activate the getAllUsers method if the route is GET(method) /users
app.route('/userAndReviews').get(userController.getUsersAndReviews);
app.route('/login').post(userController.login);
app.route('/users/:id').put(userController.updateUser); // activate the updateUser method if the route is PUT(method) /users/:id
app.route('/users/:id').delete(userController.deleteUser); // activate the deleteUser method if the route is DELETE(method) /users/:id

app.route('/restaurants').get(restaurantController.getAllRestaurants); // activate the getAllRestaurants method if the route is GET(method) /restaurants
app.route('/restaurants/:id').get(restaurantController.getRestaurantById); // activate the getAllRestaurants method if the route is GET(method) /restaurants

app.route('/favourites').get(favouriteController.getAllFavourites); // activate the getAllFavourites method if the route is GET(method) /favourites
app.route('/favourites').post(favouriteController.addFavourite); // activate the addFavourite method if the route is POST(method) /favourites
app.route('/favourites/:id').delete(favouriteController.deleteFavourite); // activate the deleteFavourite method if the route is DELETE(method) /favourites/:id

app.route('/reviews').get(reviewController.getAllReviews); // activate the getAllReviews method if the route is GET(method) /reviews
app.route('/reviews').post(reviewController.addReview); // activate the addReview method if the route is POST(method) /reviews
app.route('/reviews/:id').put(reviewController.updateReview); // activate the updateReview method if the route is PUT(method) /reviews/:id
app.route('/reviews/:id').delete(reviewController.deleteReview); // activate the deleteReview method if the route is DELETE(method) /reviews/:id

app.route('/reviewLikes').get(reviewLikeController.getAllReviewLikes); // activate the getAllReviewLikes method if the route is GET(method) /reviewLikes
app.route('/reviewLikes').post(reviewLikeController.addReviewLike); // activate the addReviewLike method if the route is POST(method) /reviewLikes
app.route('/reviewLikes/:id').delete(reviewLikeController.deleteReviewLike); // activate the deleteReviewLike method if the route is DELETE(method) /reviewLikes/:id

app.route('/groups').get(groupController.getAllGroups); // activate the getAllGroups method if the route is GET(method) /groups
app.route('/groupMembers').get(groupController.getGroupMembers); // activate the getAllGroups method if the route is GET(method) /groups
app.route('/groupArticles').get(groupController.getGroupArticles); // activate the getAllGroups method if the route is GET(method) /groups
app.route('/groups').post(groupController.addGroup); // activate the addGroup method if the route is POST(method) /groups
app.route('/groups/:id').put(groupController.updateGroup); // activate the updateGroup method if the route is PUT(method) /groups/:id
app.route('/groups/:id').delete(groupController.deleteGroup); // activate the deleteGroup method if the route is DELETE(method) /groups/:id

app.route('/memberships').get(membershipController.getAllMemberships); // activate the getAllMemberships method if the route is GET(method) /memberships
app.route('/memberships').post(membershipController.addMembership); // activate the addMembership method if the route is POST(method) /memberships
app.route('/memberships/:id').put(membershipController.updateMembership); // activate the updateMembership method if the route is PUT(method) /memberships/:id
app.route('/memberships/:id').delete(membershipController.deleteMembership); // activate the deleteMembership method if the route is DELETE(method) /memberships/:id

app.route('/articles').get(articleController.getAllArticles); // activate the getAllArticles method if the route is GET(method) /articles
app.route('/articles').post(articleController.addArticle); // activate the addArticle method if the route is POST(method) /articles
app.route('/articles/:id').put(articleController.updateArticle); // activate the updateArticle method if the route is PUT(method) /articles/:id
app.route('/articles/:id').delete(articleController.deleteArticle); // activate the deleteArticle method if the route is DELETE(method) /articles/:id

app.route('/articleLikes').get(articleLikeController.getAllArticleLikes); // activate the getAllArticleLikes method if the route is GET(method) /articleLikes
app.route('/articleLikes').post(articleLikeController.addArticleLike); // activate the addArticleLike method if the route is POST(method) /articleLikes
app.route('/articleLikes/:id').delete(articleLikeController.deleteArticleLike); // activate the deleteArticleLike method if the route is DELETE(method) /articleLikes/:id

app.route('/articleReplys').get(articleReplyController.getAllArticleReplys); // activate the getAllArticleReplys method if the route is GET(method) /articles
app.route('/articleReplys').post(articleReplyController.addArticleReply); // activate the addArticleReply method if the route is POST(method) /articles
app.route('/articleReplys/:id').put(articleReplyController.updateArticleReply); // activate the addArticleReply method if the route is POST(method) /articles
app.route('/articleReplys/:id').delete(articleReplyController.deleteArticleReply); // activate the deleteArticle method if the route is DELETE(method) /articles/:id

app.listen(8080, "127.0.0.1"); // start the nodejs to be listening for incoming request @ port 8080
console.log("web server running @ http://127.0.0.1:8080"); // output to console 
