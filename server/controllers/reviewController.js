"use strict";
const ReviewsDB = require('../models/ReviewsDB');
const Review = require('../models/Review');
const dayjs = require('dayjs');

var reviewsDB = new ReviewsDB();

function getAllReviews(request, respond) {
    reviewsDB.getAllReviews(function(error, result){
        if(error) {
            respond.json(error);
        }
        else {
            respond.json(result);
        }
    })
}

function addReview(request, respond) {
    var review = new Review(null, request.body.title, request.body.comment, request.body.rating, request.body.price, dayjs().format("ddd MMM D, YYYY | h:mm A"), request.body.userId, request.body.restaurantId);
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
    var review = new Review(parseInt(request.params.id), request.body.title, request.body.comment, request.body.rating, request.body.price, dayjs().format("ddd MMM D, YYYY | h:mm A"), request.body.userId, request.body.restaurantId);
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
    reviewsDB.deleteReview(reviewId, function(error, result){
        if(error) {
            respond.json(error);
        }
        else {
            respond.json(result);
        }
    });
}

module.exports = {getAllReviews, addReview, updateReview, deleteReview};