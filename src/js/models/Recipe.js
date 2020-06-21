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

    calcTime() {
        const numIng = this.ingredients.length;
        const perionds = Math.ceil(numIng / 3);
        this.time = perionds * 15;
    }

    calcServings() {
        this.servings = 4;
    }

    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const units = [...unitsShort, 'kg', 'g'];
        this.ingredients = this.ingredients.map((element) => {
            //uniform units
            let ingredient = element.toLowerCase();
            unitsLong.forEach((unit, index) => {
                ingredient = ingredient.replace(unit, units[index]);
            });
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

            let ingArray = ingredient.split(" ");
            const unitIndex = ingArray.findIndex(unit => units.includes(unit));
            let ingObject;
            if (unitIndex > -1) {
                const countValues = ingArray.slice(0, unitIndex);
                const count = eval(countValues.length === 1 ? countValues[0].replace("-", "+") : countValues.join("+"));
                ingObject = {
                    count: count ? count : 1,
                    unit: ingArray[unitIndex],
                    ingredient: ingArray.slice(unitIndex + 1).join(" ")
                }
            } else if (parseInt(ingArray[0])) {
                ingObject = {
                    count: parseInt(ingArray[0]),
                    unit: "",
                    ingredient: ingArray.slice(1).join(" ")
                }
            } else {
                ingObject = {
                    count: 1,
                    unit: "",
                    ingredient: ingArray.join(" ")
                }
            }
            return ingObject;
        });
    }

    updateServings(type) {
        const newServings = type === "dec" ? this.servings - 1 : this.servings + 1;
        this.ingredients.forEach(ing => {
            ing.count = ing.count * (newServings / this.servings);
        });
        this.servings = newServings;
    }
}