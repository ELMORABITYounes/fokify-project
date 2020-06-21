import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import Search from './models/Search';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView'
import {elements, renderLoader, clearLoader} from './views/base';



// App state
window.state = {
    list: new List(),
    likes: new Likes()
};

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    searchController();
});

/**
 * Search Controller
 */
const searchController = async () => {
    const query = searchView.getInput();

    if (query) {
        state.search = new Search(query);
        searchView.clearInput();
        searchView.clearResults();
        try {
            renderLoader(elements.searchResContainer);
            await state.search.getResults();
            clearLoader();
            searchView.renderResult(state.search.results);
        } catch (error) {
            clearLoader();
        }

    }
};

elements.searchResultPages.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-inline");
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto);
        searchView.clearResults();
        searchView.renderResult(state.search.results, goToPage);
    }
});

elements.recipe.addEventListener('click', e => {
    if (e.target.matches(".btn-decrease,.btn-decrease *")) {
        if (state.recipe.servings > 1) {
            state.recipe.updateServings("dec");
        }
        recipeView.updateServingsAndIngredients(state.recipe);
    } else if (e.target.matches(".btn-increase,.btn-increase *")) {
        state.recipe.updateServings("inc");
        recipeView.updateServingsAndIngredients(state.recipe);
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        listController();
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        likeController();
    }
});

/**
 * Recipe controller
 */
const recipeController = async () => {
    const id = window.location.hash.replace("#", "");

    if (id) {
        recipeView.clearRecipe();
        renderLoader(elements.recipe);
        if (state.search) {
            searchView.highlightSelected(id);
        }
        state.recipe = new Recipe(id);
        try {
            await state.recipe.getRecipe();
            state.recipe.calcTime();
            state.recipe.calcServings();
            state.recipe.parseIngredients();
            clearLoader();
            recipeView.renderRecipe(state.recipe);
            recipeView.setLiked(state.likes.isLiked(state.recipe.id));
        } catch (error) {
            console.log(error);
        }
    }
};

["hashchange", "load"].forEach((event) => window.addEventListener(event, recipeController));

/**
 * Ingredients list controller
 */
const listController = () => {

    state.recipe.ingredients.forEach((ing) => {
        const item = state.list.addItem(ing.count, ing.unit, ing.ingredient);
        listView.renderItem(item);
    })
};


elements.shoppingList.addEventListener("click", event => {
    const id = event.target.closest(".shopping__item").dataset["itemId"];

    if (event.target.matches(".shopping__delete, .shopping__delete *")) {
        state.list.deleteItem(id);
        listView.deleteItem(id);
    } else if (event.target.matches(".shopping__count-value")) {
        const val = parseFloat(event.target.value);
        state.list.updateCount(id, val);
    }
});

/**
 * Likes Controller
 */

const likeController = () => {
    if (!state.likes.isLiked(state.recipe.id)) {
        const like = state.likes.addLike(state.recipe.id, state.recipe.title, state.recipe.author, state.recipe.image);
        likesView.renderItem(like);
        recipeView.setLiked(true)
    } else {
        state.likes.deleteLike(state.recipe.id);
        likesView.deleteItem(state.recipe.id);
        recipeView.setLiked(false)
    }
    likesView.setLikeIconVisibility(state.likes.getNumberOfLikes());
};

window.addEventListener("load", () => {
    state.likes.restore();
    likesView.renderAll(state.likes);
    likesView.setLikeIconVisibility(state.likes.getNumberOfLikes());
});