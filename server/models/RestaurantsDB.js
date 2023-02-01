"use strict";

var db = require('../db-connection');

class RestaurantsDB{
    getAllRestaurants(regions, categories, searchString, callback) {
        var sql = "SELECT rt.*, count(rv._id) as totalReviews, round(avg(rv.rating),0) as averageRating, round(avg(rv.price)) as averagePrice FROM restaurant as rt LEFT JOIN review as rv ON rt._id = rv.restaurantId ";
        if (regions && categories) {
            var regionsSplit = regions.split(",").join("' OR rt.region = '");
            sql += " WHERE rt.region = '" + regionsSplit + "'";
            var categoriesSplit = categories.split(",").join("%' OR rt.category LIKE '%");
            sql += " AND rt.category LIKE '%" + categoriesSplit + "%'";
        }
        else if(regions || categories) {
            if(regions) {
                var regionsSplit = regions.split(",").join("' OR rt.region = '");
                sql += " WHERE rt.region = '" + regionsSplit + "'";
            }
            if(categories) {
                var categoriesSplit = categories.split(",").join("%' OR rt.category LIKE '%");
                sql += " WHERE rt.category LIKE '%" + categoriesSplit + "%'";
            }
        }
        if(searchString) {
            sql += " WHERE rt.restaurantName LIKE '%" + searchString + "%' OR rt.town LIKE '%" + searchString + "%'";
        }
        sql += " GROUP BY rt._id";
        console.log(sql);
        db.query(sql, callback);
    }

    getRestaurantById(restaurantId, callback) {
        var sql = "SELECT * FROM restaurant WHERE _id = ?";
        db.query(sql, [restaurantId], callback);
    }
}

module.exports = RestaurantsDB;
