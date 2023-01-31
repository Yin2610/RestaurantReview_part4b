"use strict";
const ArticlesDB = require('../models/ArticlesDB');
const Article = require('../models/Article');

const dayjs = require('dayjs');

var articlesDB = new ArticlesDB();

function getAllArticles(request, respond) {
    articlesDB.getAllArticles(function(error, result){
        if(error) {
            respond.json(error);
        }
        else {
            respond.json(result);
        }
    })
}

function addArticle(request, respond) {
    var article = new Article(null, request.body.title, request.body.body, dayjs().format("ddd MMM D, YYYY | h:mm A"), request.body.memberId, request.body.groupId);
    articlesDB.addArticle(article, function(error, result) {
        if(error) {
            respond.json(error);
        }
        else {
            respond.json(result);
        }
    });
}

function updateArticle(request, respond) {
    var article = new Article(parseInt(request.params.id), request.body.title, request.body.body, dayjs().format("ddd MMM D, YYYY | h:mm A"), request.body.memberId, request.body.groupId);
    articlesDB.updateArticle(article, function(error, result) {
        if(error) {
            respond.json(error);
        }
        else {
            respond.json(result);
        }
    });
}

function deleteArticle(request, respond) {
    var articleId = request.params.id;
    articlesDB.deleteArticle(articleId, function(error, result){
        if(error) {
            respond.json(error);
        }
        else {
            respond.json(result);
        }
    });
}

module.exports = {getAllArticles, addArticle, updateArticle, deleteArticle};