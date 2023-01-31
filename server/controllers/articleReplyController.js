"use strict";

const ArticleReplysDB = require('../models/ArticleReplysDB');
const ArticleReply = require('../models/ArticleReply');

const dayjs = require("dayjs");

var articleReplysDB = new ArticleReplysDB();

function getAllArticleReplys(request, respond) {
    articleReplysDB.getAllArticleReplys(function(error, result){
        if(error) {
            respond.json(error);
        }
        else {
            respond.json(result);
        }
    })
}

function addArticleReply(request, respond) {
    var articleReply = new ArticleReply(null, request.body.replyMessage, dayjs().format("ddd MMM D, YYYY | h:mm A"), request.body.articleId, request.body.memberId);
    articleReplysDB.addArticleReply(articleReply, function(error, result) {
        if(error) {
            respond.json(error);
        }
        else {
            respond.json(result);
        }
    });
}

function updateArticleReply(request, respond) {
    var articleReply = new ArticleReply(parseInt(request.params.id), request.body.replyMessage, dayjs().format("ddd MMM D, YYYY | h:mm A"), request.body.articleId, request.body.memberId);
    articleReplysDB.updateArticleReply(articleReply, function(error, result) {
        if(error) {
            respond.json(error);
        }
        else {
            respond.json(result);
        }
    });
}


function deleteArticleReply(request, respond) {
    var articleReplyId = request.params.id;
    articleReplysDB.deleteArticleReply(articleReplyId, function(error, result){
        if(error) {
            respond.json(error);
        }
        else {
            respond.json(result);
        }
    });
}

module.exports = {getAllArticleReplys, addArticleReply, updateArticleReply, deleteArticleReply};