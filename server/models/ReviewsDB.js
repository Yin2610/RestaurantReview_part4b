"use strict";

var db = require('../db-connection');

class ReviewsDB {
    
    getReviews(sortBySql, callback) {
        var sql = "SELECT r.*, u.userName, u.userPhoto FROM review as r, user as u WHERE r.userId = u._id " + sortBySql;
        console.log(sql);
        db.query(sql, callback);
    }

    addReview(review, callback) {
        var sql = "INSERT INTO review (title, comment, rating, price, postedTime, userId, restaurantId) VALUES (?, ?, ?, ?, ?, ?, ?)";
        db.query(sql, [review.getTitle(), review.getComment(), review.getRating(), review.getPrice(), review.getPostedTime(), review.getUserId(), review.getRestaurantId()], callback);
    }

    updateReview(review, callback) {
        var sql = "UPDATE review SET title = ?, comment = ?, rating = ?, price = ?, postedTime = ?, userId = ?, restaurantId = ? WHERE _id = ?";
        return db.query(sql, [review.getTitle(), review.getComment(), review.getRating(), review.getPrice(), review.getPostedTime(), review.getUserId(), review.getRestaurantId(), review.getId()], callback);
    }

    deleteReview(reviewId, callback) {
        var sql = "DELETE FROM review WHERE _id = ?";
        return db.query(sql, [reviewId], callback);
    }
}

module.exports = ReviewsDB;