import { RouterProvider, createBrowserRouter, Navigate  } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import {publicRoutes, privateRoute} from './routes/Routes';
import { layoutCustomer } from './customer/layout';
import {layoutAdmin} from './admin/layout';
import Login from './Login/Login';
import { authContext } from './context/authContext';
import { ToastContainer } from 'react-toastify';

function App() {
    const token = localStorage.getItem('token');

    const {currentUser} = useContext(authContext)
    const check = currentUser?.email.includes('@harumi.com')
    
    let Layout, routes;
    if(check){
        Layout = layoutAdmin;
        routes = privateRoute;
    } else {
        Layout = layoutCustomer;
        routes = publicRoutes;
    }
    console.log(currentUser)

    const ProtectedRoute = ({ children }) => {
        if (!token) {
          return <Navigate to="/login" />;
        }
        return children;
    };
    
    const router = createBrowserRouter([
        {
          path: "/",
          element: (
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          ),
          children: routes
        },
        {
            path: "/login",
            element: <Login />
        },
    ]);
    return (
        <>
            <ToastContainer />
            <RouterProvider router={router}/>    
        </>
    );
}

export default App;
