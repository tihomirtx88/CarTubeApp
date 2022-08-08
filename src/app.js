import { logout } from "./api/api.js";
import { page, render } from "./lib.js";
import { getUserData } from "./util.js";

import { catalogPage } from "./views/catalog.js";
import { createPage } from "./views/createPage.js";
import { detailsPage } from "./views/detailsPage.js";
import { editPage } from "./views/editPage.js";
import { homePage } from "./views/homePage.js";
import { loginPage } from "./views/loginPage.js";
import { profilePage } from "./views/profilePage.js";
import { registerPage } from "./views/registerPage.js";
import { searchPage } from "./views/serachPage.js";


const root = document.querySelector(`main`);
document.getElementById(`logoutBtn`).addEventListener(`click`, onLogout);

page(decorateContext);
page(`/`, homePage);
page(`/catalog`,catalogPage );
page(`/login`, loginPage);
page(`/register`, registerPage);
page(`/create`, createPage);
page(`/profile`, profilePage);
page(`/details/:id`,detailsPage);
page(`/edit/:id`,editPage);
page(`/search`, searchPage);

updateUserNav();
page.start();

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content,root);
    ctx.updateUserNav = updateUserNav;

    next();
}

function onLogout(){
  logout();
  updateUserNav();
  page.redirect(`/`);
}

function updateUserNav(){
    const userData = getUserData();

    if (userData) {
        document.querySelector(`#profile`).style.display = `block`;
        document.querySelector(`#guest`).style.display = `none`;
        document.querySelector(`.welcome`).textContent = `Welcome, ${userData.username}`
        
    }else{
        document.querySelector(`#profile`).style.display = `none`;
        document.querySelector(`#guest`).style.display = `block`;
    }
}