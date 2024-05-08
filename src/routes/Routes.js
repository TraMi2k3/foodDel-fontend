import PageNotFound from '../pages/PageNotFound/PageNotFound';
import Home from '../pages/Home/Home';
import About from '../pages/About/About';
import Contact from '../pages/Contact/Contact';
import Event from '../pages/Event/Event';
import Menu from '../pages/Menu/Menu';
import Services from '../pages/Services/Services';
import Cart from '../pages/Cart/Cart';
import Blog from '../pages/Blog/Blog';

const publicRoutes = [
    { path: '*', component: PageNotFound },
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/contact', component: Contact },
    { path: '/event', component: Event },
    { path: '/menu', component: Menu },
    { path: '/services', component: Services },
    { path: 'cart', component: Cart },
    { path: '/blog', component: Blog },
];

export default publicRoutes;
