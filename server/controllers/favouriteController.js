"use strict";
const FavouritesDB = require('../models/FavouritesDB');
const Favourite = require('../models/Favourite');

var favouritesDB = new FavouritesDB();

function getAllFavourites(request, respond){
    favouritesDB.getAllFavourites(function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });
}

function addFavourite(request, respond){
    var favourite = new Favourite(null, request.body.userId, request.body.restaurantId);
    favouritesDB.addFavourite(favourite, function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    })
}

function deleteFavourite(request, respond){
    var favouriteId = request.params.id;
    favouritesDB.deleteFavourite(favouriteId, function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });
}

module.exports = {getAllFavourites, addFavourite, deleteFavourite};
