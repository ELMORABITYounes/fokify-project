export const elements = {
    searchForm: document.querySelector(".search"),
    searchInput: document.querySelector(".search__field"),
    searchResultList: document.querySelector(".results__list"),
    searchResContainer: document.querySelector(".results"),
    searchResultPages:document.querySelector(".results__pages"),
    recipe:document.querySelector(".recipe"),
    shoppingList:document.querySelector(".shopping__list"),
    likesList:document.querySelector(".likes__list"),
    likeIcon:document.querySelector(".likes__field")
};

export const selectors = {
    loader :'loader'
};

export const renderLoader = parent => {
    const loader = `
    <div class="${selectors.loader}">
        <svg>
            <use href="img/icons.svg#icon-cw"></use>
        </svg>
    </div>
    `;
    parent.insertAdjacentHTML("afterbegin", loader);
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${selectors.loader}`);
    if(loader){
        loader.parentElement.removeChild(loader);
    }
};