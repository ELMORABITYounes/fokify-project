import axios from 'axios';
import * as config from '../config';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        try {
            const result = await axios(`${config.FORKIFY_API_SEARCH}${this.query}`);
            this.results = result.data.recipes;
            console.log(this.results);
        } catch (error) {
            console.log(error);
        }
    }
}  
