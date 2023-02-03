"use strict";
const ReviewsDB = require('../models/ReviewsDB');
const Review = require('../models/Review');
const dayjs = require('dayjs');

var reviewsDB = new ReviewsDB();

function getReviews(request, respond) {
    var sortBy = request.query.sortBy;
    var sortBySql = "";
    if(sortBy == "Oldest") {
        sortBySql = "ORDER BY postedTime ASC";
    } 
    else if(sortBy == "Most recent") {
        sortBySql = "ORDER BY postedTime DESC";
    }
    else if(sortBy == "Best rating") {
        sortBySql = "ORDER BY rating DESC"
    }
    else if(sortBy == "Worst rating") {
        sortBySql = "ORDER BY rating ASC";
    }
    else {
        sortBySql = "ORDER BY r._id";
    }
    reviewsDB.getReviews(sortBySql, function(error, result){
        if(error) {
            respond.json(error);
        }
        else {
            respond.json(result);
        }
    });
}

function addReview(request, respond) {
    var review = new Review(null, request.body.title, request.body.comment, request.body.rating, request.body.price, dayjs().format("YYYY-MM-DD HH:mm:ss"), request.body.userId, request.body.restaurantId);
    reviewsDB.addReview(review, function(error, result) {
        if(error) {
            respond.json(error);
        }
        else {
            respond.json(result);
        }
    });
}

function updateReview(request, respond) {
    var review = new Review(parseInt(request.params.id), request.body.title, request.body.comment, request.body.rating, request.body.price, dayjs().format("YYYY-MM-DD HH:mm:ss"), request.body.userId, request.body.restaurantId);
    reviewsDB.updateReview(review, function(error, result) {
        if(error) {
            respond.json(error);
        }
        else {
            respond.json(result);
        }
    });
}

function deleteReview(request, respond) {
    var reviewId = request.params.id;
    console.log(reviewId);
    reviewsDB.deleteReview(reviewId, function(error, result){
        if(error) {
            respond.json(error);
        }
        else {
            respond.json(result);
        }
    });
}

module.exports = {getReviews, addReview, updateReview, deleteReview};