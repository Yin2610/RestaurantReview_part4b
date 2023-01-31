"use strict";

class ArticleReply {
    constructor(id, replyMessage, postedTime, articleId, memberId) {
        this.id = id;
        this.replyMessage = replyMessage;
        this.postedTime = postedTime;
        this.articleId = articleId;
        this.memberId = memberId;
    }

    getId() {
        return this.id;
    }

    getReplyMessage() {
        return this.replyMessage;
    }

    getPostedTime() {
        return this.postedTime;
    }

    getArticleId() {
        return this.articleId;
    }
     
    getMemberId() {
        return this.memberId;
    }

    setReplyMessage(replyMessage) {
        this.replyMessage = replyMessage;
    }

    setPostedTime(postedTime) {
        this.postedTime = postedTime;
    }

    setArticleId(articleId) {
        this.articleId = articleId;
    }

    setMemberId(memberId) {
        this.memberId = memberId;
    }
}

module.exports = ArticleReply;