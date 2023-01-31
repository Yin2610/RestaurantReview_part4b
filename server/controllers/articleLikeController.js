"use strict";

const ArticleLikesDB = require('../models/ArticleLikesDB');
const ArticleLike = require('../models/ArticleLike');

var articleLikesDB = new ArticleLikesDB();

function getAllArticleLikes(request, respond) {
    articleLikesDB.getAllArticleLikes(function(error, result){
        if(error) {
            respond.json(error);
        }
        else {
            respond.json(result);
        }
    })
}

function addArticleLike(request, respond) {
    var articleLike = new ArticleLike(null, request.body.memberId, request.body.articleId);
    articleLikesDB.addArticleLike(articleLike, function(error, result) {
        if(error) {
            respond.json(error);
        }
        else {
            respond.json(result);
        }
    });
}

function deleteArticleLike(request, respond) {
    var articleLikeId = request.params.id;
    articleLikesDB.deleteArticleLike(articleLikeId, function(error, result){
        if(error) {
            respond.json(error);
        }
        else {
            respond.json(result);
        }
    });
}

module.exports = {getAllArticleLikes, addArticleLike, deleteArticleLike};