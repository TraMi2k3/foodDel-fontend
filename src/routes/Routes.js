import Home from '../customer/pages/Home/Home';
import Cart from '../customer/pages/Cart/Cart';
import PlaceOrder from '../customer/pages/PlaceOrder/PlaceOrder';
import Verify from '../customer/pages/Verify/Verify';
import MyOrders from '../customer/pages/MyOrders/MyOrders';
import Add from '../admin/pages/Add/Add';
import List from '../admin/pages/List/List';
import Order from '../admin/pages/Order/Order';
import FoodItemDetail from '../customer/pages/FoodItemDetail/FoodItemDetail';

const publicRoutes = [
    { path: '/', element: <Home /> },
    { path: '/cart', element: <Cart/> },
    { path: '/order', element: <PlaceOrder/> },
    { path: '/verify', element: <Verify/> },
    { path: '/myorders', element: <MyOrders/> },
    { path: '/food/:id', element: <FoodItemDetail/> },
];

const privateRoute = [
    { path: '/add', element: <Add/>},
    { path: '/list', element: <List/> },
    { path: '/orders', element: <Order/> },
]
export {publicRoutes, privateRoute};
