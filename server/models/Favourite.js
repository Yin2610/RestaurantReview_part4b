"use strict";

class Favourite {
    constructor(id, userId, restaurantId) {
        this.id = id;
        this.userId = userId;
        this.restaurantId = restaurantId;
    }

    getId() {
        return this.id;
    }

    getUserId() {
        return this.userId;
    }
    
    getRestaurantId() {
        return this.restaurantId;
    }

    setUserId(userId) {
        this.userId = userId;
    }

    setRestaurantId(restaurantId) {
        this.restaurantId = restaurantId;
    }
}

module.exports = Favourite;