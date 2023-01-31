"use strict";

var db = require("../db-connection");

class ArticleLikesDB {
    getAllArticleLikes(callback) {
        var sql = "SELECT * FROM restaurant_review.articlelike";
        db.query(sql, callback);
    }

    addArticleLike(articleLike, callback) {
        var sql = "INSERT INTO articlelike(memberId, articleId) VALUES (?, ?)";
        db.query(sql, [articleLike.getMemberId(), articleLike.getArticleId()], callback);
    }

    deleteArticleLike(articleLikeId, callback) {
        var sql = "DELETE FROM articlelike WHERE _id = ?";
        db.query(sql, [articleLikeId], callback);
    }
}

module.exports = ArticleLikesDB;