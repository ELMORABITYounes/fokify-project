import { elements } from './base';

export const getInput = () => elements.searchInput.value;
export const clearInput = () => { elements.searchInput.value = "" };
export const clearResults = () => {
    elements.searchResultList.innerHTML = "";
    elements.searchResultPages.innerHTML = ""
};

export const highlightSelected = (id) =>{
    const resultsArr=Array.from(document.querySelectorAll(`.results__link`));
    resultsArr.forEach((element)=>{
        element.classList.remove("results__link--active");
    });
    document.querySelector(`.results__link[href="#${id}"]`).classList.add('results__link--active');
};

const reduceTitleLength = (title, limit = 20) => {
    if (title.length > limit) {
        let newTitle = title.substr(0, limit);
        if (newTitle.lastIndexOf(" ") > 0) {
            newTitle = newTitle.substr(0, newTitle.lastIndexOf(" "));
        } else if (title.indexOf(" ", limit) > 0) {
            newTitle = title.substr(0, title.indexOf(" ", limit));
        }
        return newTitle + " ...";
    }
    return title;
};

const renderRecipe = (recipe) => {
    const markup = `<li>
    <a class="results__link" href="#${recipe.recipe_id}">
        <figure class="results__fig">
            <img src="${recipe.image_url}" alt="${recipe.image_url}">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${reduceTitleLength(recipe.title)}</h4>
            <p class="results__author">${recipe.publisher}</p>
        </div>
    </a>
</li>   `;

    elements.searchResultList.insertAdjacentHTML("beforeend", markup)

};

const createButton = (page, type) => `
<button class="btn-inline results__btn--${type}" data-goto=${type === "prev" ? page - 1 : page + 1}>
    <span>Page ${type === "prev" ? page - 1 : page + 1}</span> 
    <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-${type === "prev" ? "left" : "right"}"></use>
    </svg>
</button>
`;


const renderButtons = (page, numPerPage, resultsNum) => {
    const pages = Math.ceil(resultsNum / numPerPage);
    let buttons;
    if (page === 1 && pages > 1) {
        buttons = createButton(page, "next")
    } else if (page < pages) {
        buttons = `${createButton(page, "prev")}${createButton(page, "next")}`
    } else if (page === pages && pages > 1) {
        buttons = createButton(page, "prev")
    }
    elements.searchResultPages.insertAdjacentHTML("beforeend", buttons);
};


export const renderResult = (recipes, page = 1, resPerPage = 10) => {
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    recipes.slice(start, end).forEach(renderRecipe);
    renderButtons(page, resPerPage, recipes.length);
};
