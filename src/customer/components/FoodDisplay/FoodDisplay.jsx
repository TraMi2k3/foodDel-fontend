import { useContext } from 'react';
import './fooddisplay.scss';
import { storeContext } from '../../context/storeContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {
    const { food_list } = useContext(storeContext);
    //console.log(food_list);

    return (
        <div className="food-display" id="food-display">
            <h2>Top dishes near you</h2>
            <div className="list">
                {food_list.map((item, index) => {
                    if (category === 'All' || category === item.category) {
                        return <FoodItem key={index} item={item} />;
                    }
                })}
            </div>
        </div>
    );
};

export default FoodDisplay;
