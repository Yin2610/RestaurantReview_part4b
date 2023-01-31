"use strict";

class ArticleLike {
    constructor(id, memberId, articleId) {
        this.id = id;
        this.memberId = memberId;
        this.articleId = articleId;
    }

    getId() {
        return this.id;
    }

    getMemberId() {
        return this.memberId;
    }

    getArticleId() {
        return this.articleId;
    }

    setMemberId(memberId) {
        this.memberId = memberId;
    }

    setArticleId(articleId) {
        this.articleId = articleId;
    }
}

module.exports = ArticleLike;