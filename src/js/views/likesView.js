import {elements} from './base';

export const renderItem = item => {

    const markup = `
    <li data-item-id=${item.id}>
        <a class="likes__link" href="#${item.id}">
            <figure class="likes__fig">
                <img src="${item.img}" alt="Test">
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${item.title}</h4>
                <p class="likes__author">${item.author}</p>
            </div>
        </a>
    </li>`;
    elements.likesList.insertAdjacentHTML("beforeend", markup);
};

export const deleteItem = id => {
    const item = document.querySelector(`[data-item-id="${id}"]`);
    item.parentElement.removeChild(item);
};


export const renderAll = (likes) => {
    likes.likes.forEach((like) => renderItem(like));
};

export const setLikeIconVisibility = (length) => {
    if (length > 0) {
        elements.likeIcon.style.visibility="visible";
    } else {
        elements.likeIcon.style.visibility="hidden";
    }
};