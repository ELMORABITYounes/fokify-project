import axios from "axios";
import * as config from "../config";

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try {
            const result = await axios(`${config.FORKIFY_API_GET}${this.id}`);
            this.title = result.data.recipe.title;
            this.image = result.data.recipe.image_url;
            this.author = result.data.recipe.publisher;
            this.url = result.data.recipe.source_url;
            this.ingredients = result.data.recipe.ingredients;            
        } catch (error) {
            console.log(error);
        }
    }

    calcTime(){
        const numIng = this.ingredients.lenght;
        const perionds = Math.ceil(numIng / 3);
        this.time = perionds * 15;
    }

    calcServings(){
        this.serving = 4;
    }
}