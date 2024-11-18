import React, { useContext, useCallback, useEffect } from "react";
import { RouterProvider, createHashRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout.jsx";
import Home from "./Components/Home/Home.jsx";
import Login from "./Components/Login/Login.jsx";
import Register from "./Components/Register/Register.jsx";
import Products from "./Components/Products/Products.jsx";
import Cart from "./Components/Cart/Cart.jsx";
import Notfound from "./Components/Notfound/Notfound.jsx";
import Categories from "./Components/Categories/Categories.jsx";
import SpecificCategory from "./Components/SpecificCategory/SpecificCategory.jsx";
import CounterContextProvider from "./Context/CounterContext.js"; // تحديث الامتداد إلى .js
import { userContext, UserProvider } from "./Context/UserContext.js"; // تحديث الامتداد إلى .js
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute.jsx";
import ProductDetails from "./Components/ProductDetails/ProductDetails.jsx";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword.jsx";
import ResetPassword from "./Components/ResetPassword/ResetPassword.jsx";
import CartContextProvider from "./Context/CartContext.js"; // تحديث الامتداد إلى .js
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const routers = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: (<ProtectedRoute> <Home /> </ProtectedRoute>) },
      { path: "login", element: (<Login />) },
      { path: "register", element: (<Register />) },
      { path: "products", element: (<ProtectedRoute> <Products /> </ProtectedRoute>) },
      { path: "categories", element: (<ProtectedRoute> <Categories /> </ProtectedRoute>) },
      { path: "category/:categoryId", element: (<ProtectedRoute> <SpecificCategory /> </ProtectedRoute>) },
      { path: "cart", element: (<ProtectedRoute> <Cart /> </ProtectedRoute>) },
      { path: "productDetails/:id", element: (<ProtectedRoute> <ProductDetails /> </ProtectedRoute>) },
      { path: "forgotPassword", element: (<ForgotPassword />) },
      { path: "resetPassword", element: (<ResetPassword />) },
      { path: "*", element: (<Notfound />) },
    ],
  },
]);

function App() {
  const { setUserToken } = useContext(userContext);

  const retrieveUserToken = useCallback(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setUserToken(token);
    }
  }, [setUserToken]);

  useEffect(() => {
    retrieveUserToken();
  }, [retrieveUserToken]);

  return (
    <CartContextProvider>
      <CounterContextProvider>
        <UserProvider>
          <RouterProvider router={routers} />
        </UserProvider>
      </CounterContextProvider>
      <ToastContainer />
    </CartContextProvider>
  );
}

export default App;
