"use strict"; 

class Review {
    constructor(id, title, comment, rating, price, postedTime, userId, restaurantId) { 
        this.id = id; 
        this.title = title; 
        this.comment = comment; 
        this.rating = rating;
        this.price = price; 
        this.postedTime = postedTime; 
        this.userId = userId;
        this.restaurantId = restaurantId;
    } 

    getId() {
        return this.id;
    }

    getTitle() { 
        return this.title; 
    } 

    getComment() { 
        return this.comment; 
    } 

    getRating() { 
        return this.rating; 
    } 

    getPrice() { 
        return this.price; 
    } 

    getPostedTime() { 
        return this.postedTime; 
    } 

    getUserId() { 
        return this.userId; 
    } 

    getRestaurantId() { 
        return this.restaurantId; 
    } 

    setTitle(title) { 
        this.title = title; 
    } 

    setComment(comment) { 
        this.comment = comment; 
    } 
 
    setRating(rating) { 
        this.rating = rating; 
    } 

    setPrice(price) { 
        this.price = price; 
    } 

    setPostedTime(postedTime) { 
        this.postedTime = postedTime; 
    } 

    setUserId(userId) { 
        this.userId = userId; 
    } 

    setRestaurantId(restaurantId) { 
        this.restaurantId = restaurantId; 
    } 
} 

module.exports = Review;