"use strict";

var db = require("../db-connection");

class ArticlesDB {
    getAllArticles(callback) {
        var sql = "SELECT * FROM restaurant_review.article";
        db.query(sql, callback);
    }

    addArticle(article, callback) {
        var sql = "INSERT INTO article(title, body, postedTime, memberId, groupId) VALUES (?, ?, ?, ?, ?)";
        db.query(sql, [article.getTitle(), article.getBody(), article.getPostedTime(), article.getMemberId(), article.getGroupId()], callback);
    }

    updateArticle(article, callback) {
        var sql = "UPDATE article SET title = ?, body = ?, postedTime = ?, memberId = ?, groupId = ? WHERE _id = ?";
        db.query(sql, [article.getTitle(), article.getBody(), article.getPostedTime(), article.getMemberId(), article.getGroupId(), article.getId()], callback);
    }

    deleteArticle(articleId, callback) {
        var sql = "DELETE FROM article WHERE _id = ?";
        db.query(sql, [articleId], callback);
    }
}

module.exports = ArticlesDB;