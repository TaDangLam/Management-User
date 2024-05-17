import { AuthRoute } from "./authRoute.js";

const routes = (app) => {
    app.use('/user', UserRoute);
}

export default routes;
