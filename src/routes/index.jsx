import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import AdminPanel from '../pages/AdminPanel'
import AllUsers from '../pages/AllUser'
import AllProducts from '../pages/AllProducts'
import CategoryProduct from '../pages/CategoryProduct'
import ProductDetails from '../pages/ProductDetails'
import Cart from '../pages/Cart'
import SearchProduct from '../pages/SearchProduct'
import CancelPayment from '../pages/CancelPayment'
import SuccessPage from '../pages/SuccessPage'
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "sign-up",
                element: <SignUp />,
            },
            {
                path: "product-category",
                element: <  CategoryProduct />,
            },
            {
                path : "product/:id",
                element : <ProductDetails/>
            },
            {
                path : "Cart",
                element :  <Cart/>
            },
            
            {
                path : "success",
                element :  <CancelPayment/>
            },
            {
                path : "search",
                element :  <SearchProduct/>
            },
            {
                path : "cancel",
                element :  <SuccessPage/>
            },
            {
                path: "admin-panel",
                element: <AdminPanel />,
                children: [

                    {
                        path: "all-users",
                        element: <AllUsers />
                    },
                    {
                        path: "all-products",
                        element: <AllProducts />
                    },
                ]


            },
        ],
    }
])

export default router