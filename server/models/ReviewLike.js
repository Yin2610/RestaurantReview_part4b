"use strict";

class ReviewLike {
    constructor(id, userId, reviewId) {
        this.id = id;
        this.userId = userId;
        this.reviewId = reviewId;
    }

    getId() {
        return this.id;
    }

    getUserId() {
        return this.userId;
    }

    getReviewId() {
        return this.reviewId;
    }

    setUserId(userId) {
        this.userId = userId;
    }

    setReviewId(reviewId) {
        this.reviewId = reviewId;
    }
}

module.exports = ReviewLike;