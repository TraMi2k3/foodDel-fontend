import { useContext } from 'react';
import './cart.scss';
import { storeContext } from '../../context/storeContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { food_list, cartItems, addToCart, removeFromCart, deleteFromCart, getTotalCart} = useContext(storeContext);
    const navigate = useNavigate();

    return (
        <div className="cart">
            <div className="items">
                <div className="title">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br />
                <hr />
                {food_list.map((item, index) => {
                    if (cartItems[item._id] > 0) {
                        return (
                            <div key={index}>
                                <div className="title item">
                                    <img src={process.env.BACKEND_URL+"/images/"+item.image} alt="" />
                                    <p>{item.name}</p>
                                    <p>${item.price}</p>
                                    <p className='cal'>
                                        <span onClick={() => addToCart(item._id)}>+</span>
                                        {cartItems[item._id]}
                                        <span onClick={() => removeFromCart(item._id)}>-</span>
                                    </p>
                                    <p>${item.price * cartItems[item._id]}</p>
                                    <p onClick={() => deleteFromCart(item._id)} className="cross">
                                        x
                                    </p>
                                </div>
                                <hr />
                            </div>
                        );
                    }
                })}
            </div>
            <div className="bottom">
                <div className="total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="details">
                            <p>Subtotal</p>
                            <p>${getTotalCart()}</p>
                        </div>
                        <hr />
                        <div className="details">
                            <p>Delivery Fee</p>
                            <p>${getTotalCart() === 0 ? 0 : 2}</p>
                        </div>
                        <hr />
                        <div className="details">
                            <p>Total</p>
                            <b>${getTotalCart() === 0 ? 0 : getTotalCart() + 2}</b>
                        </div>
                    </div>
                    <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
                </div>
                <div className="promocode">
                    <div>
                        <p>If you have a promo code, Enter it here</p>
                        <div className="input">
                            <input type="text" placeholder="promo code" />
                            <button>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
