import { useContext, useState} from 'react';
import { Link, useNavigate} from 'react-router-dom';
import './navbar.scss';
import { storeContext } from '../../context/storeContext';
import { asset } from '../../asset/asset';

const Navbar = () => {
    const [menu, setMenu] = useState('home');
    const token = localStorage.getItem('token');
    const { getTotalCart} = useContext(storeContext);
    
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    }

    return (
        <div className="navbar">
            <Link to="/">
                <img src={asset.logo} alt="" />
            </Link>
            <ul>
                <Link to="/" onClick={() => setMenu('home')} className={menu === 'home' ? 'active' : ''}>
                    home
                </Link>
                <a href="#explore-menu" onClick={() => setMenu('menu')} className={menu === 'menu' ? 'active' : ''}>
                    menu
                </a>
                <a
                    href="#app-download"
                    onClick={() => setMenu('mobile-app')}
                    className={menu === 'mobile-app' ? 'active' : ''}
                >
                    mobile-app
                </a>
                <a
                    href="#footer"
                    onClick={() => setMenu('contact-us')}
                    className={menu === 'contact-us' ? 'active' : ''}
                >
                    contact us
                </a>
            </ul>
            <div className="right">
                <img src={asset.search} alt="" />
                <div className="search-icon">
                    <Link to="/cart">
                        <img src={asset.basket} alt="" />
                    </Link>
                    <span className={getTotalCart() ? "dot" : ""}></span>
                </div>
                {!token? 
                 <button onClick={() => navigate('/login')}>sign in</button>
                :<div className='profile'>
                    <img src={asset.profile} alt="" />
                    <ul className='dropdown'>
                        <li onClick={() => navigate('/myorders')}>
                            <img src={asset.bag_icon} alt="" />
                            <p>Orders</p>
                        </li>
                        <hr />
                        <li onClick={logout}>
                            <img src={asset.logout} alt="" />
                            <p>Logout</p>
                        </li>
                    </ul>
                 </div>
                }
            </div>
        </div>
    );
};

export default Navbar;
