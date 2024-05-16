import { AuthRoute } from "./authRoute.js";

const routes = (app) => {
    app.use('/api/auth', AuthRoute);
}

export default routes;
