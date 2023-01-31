"use strict";
const RestaurantsDB = require('../models/RestaurantsDB');
const Restaurant = require('../models/Restaurant');

var restaurantsDB = new RestaurantsDB();

function getAllRestaurants(request, respond){
    if(request.query.region) {
        var regions = request.query.region;
    }
    if(request.query.category) {
        var categories = request.query.category;
    }
    restaurantsDB.getAllRestaurants(regions, categories, function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });
}

function getRestaurantById(request, respond) {
    var restaurantId = request.params.id;
    restaurantsDB.getRestaurantById(restaurantId, function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });
}

module.exports = {getAllRestaurants, getRestaurantById};
