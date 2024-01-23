import ProductDetail from "./auth/ProductDetail";
import Dashboard from "./auth/Dashboard";
import Login from "./nonAuth/Login";

const nonAuthScreen = {
    Login
}

const authScreen = {
    ProductDetail, Dashboard
}

export {
    nonAuthScreen, authScreen
}