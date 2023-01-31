"use strict";

var db = require('../db-connection');

class FavouritesDB{
    getAllFavourites(callback){
        var sql = "SELECT * from restaurant_review.favourite";
        db.query(sql, callback);
    }

    addFavourite(favourite, callback){
        var sql = "INSERT INTO favourite (userId, restaurantId) VALUES (?, ?)";
        db.query(sql, [favourite.getUserId(), favourite.getRestaurantId()], callback);
    }

    deleteFavourite(favouriteID, callback){
        var sql = "DELETE from favourite WHERE _id = ?";
        return db.query(sql, [favouriteID], callback);
    }
}

module.exports = FavouritesDB;
