export default class Likes {
    constructor() {
        this.likes = [];
    }

    addLike(id, title, author, img) {
        const like = {
            id, title, author, img
        };
        this.likes.push(like);
        this.persist();
        return like;
    }

    deleteLike(id) {
        const index = this.likes.findIndex(e => e.id === id);
        this.likes.splice(index, 1);
        this.persist();
    }

    isLiked(id) {
        return this.likes.findIndex(e => e.id === id) > -1;
    }

    getNumberOfLikes() {
        return this.likes.length;
    }

    persist() {
        localStorage.setItem('likes', JSON.stringify(this.likes))
    }

    restore() {
        const likes = localStorage.getItem('likes');
        if (likes) {
            this.likes = JSON.parse(likes);
        }
    }
}