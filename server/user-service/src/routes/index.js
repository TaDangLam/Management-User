import { AuthRoute } from "./authRoute.js";

const routes = (app) => {
    app.use('/api/user', UserRoute);
}

export default routes;
