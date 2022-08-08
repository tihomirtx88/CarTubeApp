import { searchCar } from "../api/data.js";
import { html } from "../lib.js";
import { carCardTemplate } from "./common.js"


const searchTemplate = (cars, onSearch,params = ``) => html`
   <!-- Search Page -->
   <section id="search-cars">
            <h1>Filter by year</h1>
        
        <form @submit=${onSearch}>
             <div class="container">
                <input id="search-input" type="text" name="search" placeholder="Enter desired production year" .value=${params}>
                <button  class="button-list">Search</button>
            </div>
        </form>

            <h2>Results:</h2>
            
                ${cars.length == 0 
                ? html`<p class="no-cars"> No results.</p>`
                : html`<div class="listings">${cars.map(carCardTemplate)}</div>`}              
                
            
        </section>
`;


export async function searchPage(ctx){
    //Second step 
    const params = ctx.querystring.split(`=`)[1];
    //Tirth step
    let cars = [];
    if (params) {
        cars = await searchCar(decodeURIComponent(params));
    }
    
    ctx.render(searchTemplate(cars,onSearch,params));

    function onSearch(ev){
        //First step 
        ev.preventDefault();
        const formData = new FormData(ev.target);
        const search = formData.get(`search`);

        if (search) {
            ctx.page.redirect(`/search?query=` + encodeURIComponent(search));
        }
    }
}