"use strict";

const ReviewLikesDB = require('../models/ReviewLikesDB');
const ReviewLike = require('../models/ReviewLike');

var reviewLikesDB = new ReviewLikesDB();

function getAllReviewLikes(request, respond) {
    reviewLikesDB.getAllReviewLikes(function(error, result) {
        if(error) {
            respond.json(error);
        }
        else {
            respond.json(result);
        }
    });
}

function addReviewLike(request, respond) {
    var reviewLike = new ReviewLike(null, request.body.userId, request.body.reviewId);
    reviewLikesDB.addReviewLike(reviewLike, function(error, result) {
        if(error) {
            respond.json(error);
        }
        else {
            respond.json(result);
        }
    });
}

function deleteReviewLike(request, respond) {
    var reviewLikeId = request.params.id;
    reviewLikesDB.deleteReviewLike(reviewLikeId, function(error, result) {
        if(error) {
            respond.json(error);
        }
        else {
            respond.json(result);
        }
    });
}

module.exports = {getAllReviewLikes, addReviewLike, deleteReviewLike};