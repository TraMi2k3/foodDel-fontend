import './fooditem.scss';
import { useContext } from 'react';
import { storeContext } from '../../context/storeContext';
import { asset } from '../../asset/asset';
import { authContext } from '../../../context/authContext';
import {Link} from 'react-router-dom';

const FoodItem = ({ item }) => {
    const {url} = useContext(authContext)
    
    return (
        <div className="food-item">
            <div className="img-container">
                <img src={url+"/images/"+item.image} alt="" />
                <Link
                    to={`/food/${item._id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                >
                    <span>Detail</span>
                </Link>
            </div>
            <div className="info">
                <div className="name-rating">
                    <p>{item.name}</p>
                    <img src={asset.rating_starts} alt="" />
                </div>
                <p className="desc">{item.description}</p>
                <p className="price">${item.price}</p>
            </div>
        </div>
    );
};

export default FoodItem;
