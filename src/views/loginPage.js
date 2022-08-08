import { login } from "../api/api.js";
import { html } from "../lib.js";


const loginTemplate = (onSubmit) => html`
    <!-- Login Page -->
    <section id="login">
            <div class="container">
                <form @submit=${onSubmit} id="login-form" action="#" method="post">
                    <h1>Login</h1>
                    <p>Please enter your credentials.</p>
                    <hr>

                    <p>Username</p>
                    <input placeholder="Enter Username" name="username" type="text">

                    <p>Password</p>
                    <input type="password" placeholder="Enter Password" name="password">
                    <input type="submit" class="registerbtn" value="Login">
                </form>
                <div class="signin">
                    <p>Dont have an account?
                        <a href="/register">Sign up</a>.
                    </p>
                </div>
            </div>
        </section>
`;

export function loginPage(ctx){
    ctx.render(loginTemplate(onSubmit));

    async function onSubmit(event){
        event.preventDefault();
        const formData = new FormData(event.target);

        const username = formData.get(`username`).trim();
        const password = formData.get(`password`).trim();

        if (username == `` || password == ``) {
            return alert(`All field are reqiured`);
        }

        await login(username,password);
        ctx.updateUserNav();
        ctx.page.redirect(`/catalog`);
    }
}