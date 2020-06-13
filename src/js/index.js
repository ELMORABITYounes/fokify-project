import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements , renderLoader, clearLoader} from './views/base';

// App state
const state = {


};



const ctrlSearch = async () => {
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
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    ctrlSearch();

})

elements.searchResultPages.addEventListener("click",(e)=>{
    const btn= e.target.closest(".btn-inline")
    if(btn){
        const goToPage = parseInt(btn.dataset.goto);
        searchView.clearResults();
        searchView.renderResult(state.search.results,goToPage);
    }
    

})
