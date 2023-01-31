"use strict";

var db = require("../db-connection");

class ArticleReplysDB {
    getAllArticleReplys(callback) {
        var sql = "SELECT * FROM restaurant_review.articlereply";
        db.query(sql, callback);
    }

    addArticleReply(articleReply, callback) {
        var sql = "INSERT INTO articlereply(replyMessage, postedTime, articleId, memberId) VALUES (?, ?, ?, ?)";
        db.query(sql, [articleReply.getReplyMessage(), articleReply.getPostedTime(), articleReply.getArticleId(), articleReply.getMemberId()], callback);
    }

    updateArticleReply(articleReply, callback) {
        var sql = "UPDATE articlereply SET replyMessage = ?, postedTime = ?, articleId = ?, memberId = ? WHERE _id = ?";
        db.query(sql, [articleReply.getReplyMessage(), articleReply.getPostedTime(), articleReply.getArticleId(), articleReply.getMemberId(), articleReply.getId()], callback);
    }

    deleteArticleReply(articleReplyId, callback) {
        var sql = "DELETE FROM articlereply WHERE _id = ?";
        db.query(sql, [articleReplyId], callback);
    }
}

module.exports = ArticleReplysDB;