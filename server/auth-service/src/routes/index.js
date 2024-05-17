import { AuthRoute } from "./authRoute.js";

const routes = (app) => {
    app.use('/auth', AuthRoute);
}

export default routes;
