"use strict";

var db = require("../db-connection");

class ReviewLikesDB {
    getAllReviewLikes(callback) {
        var sql = "SELECT * FROM restaurant_review.reviewlike";
        db.query(sql, callback);
    }

    addReviewLike(reviewLike, callback) {
        var sql = "INSERT INTO reviewlike(userId, reviewId) VALUES (?, ?)";
        db.query(sql, [reviewLike.getUserId(), reviewLike.getReviewId()], callback);
    }

    deleteReviewLike(reviewLikeId, callback) {
        var sql = "DELETE FROM reviewlike WHERE _id = ?";
        db.query(sql, [reviewLikeId], callback);
    }
}

module.exports = ReviewLikesDB;