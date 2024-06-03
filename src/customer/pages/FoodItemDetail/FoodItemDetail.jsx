import { useLocation, useNavigate } from 'react-router-dom';
import './fooditemdetail.scss';
import { useContext, useEffect, useState } from 'react';
import { storeContext } from '../../context/storeContext';
import FoodItem from '../../components/FoodItem/FoodItem';
import Comment from '../../components/Comment/Comment';
import requestax from '../../../axios';
import { authContext } from '../../../context/authContext';

const FoodItemDetail = () => {
  const {url} = useContext(authContext)
  const {addToCartWithNumber, food_list} = useContext(storeContext)
  const [foodItem, setFoodItem ] = useState({})
  const [quantities, setQuantities] = useState(0);
  const foodId = useLocation().pathname.split('/')[2]
  const navigate = useNavigate();

  const fetchFoodItem = async() => {
    const response = await requestax.get("/food/find/"+foodId);
    setFoodItem(response.data.data)
  }
  
  useEffect(() => {
    fetchFoodItem();
  },[foodId])

  //console.log(foodItem);
  const handleEvent = () => {
    addToCartWithNumber(foodId, quantities);
    navigate('/cart')
  }

  const RelatedItems = food_list.filter(
    item => item.category === foodItem.category && item._id !== foodItem._id
  );
  return (
    <div className='foodDetail'>
      <div className="main-product">
        <img src={url+"/images/"+foodItem.image} alt="" />
        <div className="info">
          <h1>{foodItem.name}</h1>
          <h3>{foodItem.price}$</h3>
          <p className="desc">
          Key to the allure of mì tôm is its flavorful broth, crafted from a blend of ingredients such as shrimp shells, garlic, onions, and an array of spices. Fragrant notes of garlic and ginger intertwine with the subtle heat of chili peppers, creating a harmonious symphony of flavors that tantalize the palate. The addition of shrimp adds depth and richness to the broth, infusing it with a delightful seafood essence.
          </p>
          <span>
            <label htmlFor="quantities">Quantities</label>
            <input id="quantities" type="number" onChange={(e) => setQuantities(parseInt(e.target.value))}/>
            <span className='total'>Total: {quantities>0?quantities*foodItem.price:0}$</span>
          </span>
          <button onClick={handleEvent}>Add to cart</button>
        </div>  
      </div>

      <div className="relatedItem">
        <h2>Related products</h2>
        <div className="list">
          {RelatedItems.map((item, index) => {
              if (item.category) {
                  return <FoodItem key={index} item={item} />;
              }
          })}
        </div>
      </div>  

      <Comment foodId={foodId} />
    </div>
  )
}

export default FoodItemDetail
