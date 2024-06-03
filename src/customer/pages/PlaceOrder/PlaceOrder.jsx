import { useContext, useEffect, useState } from 'react';
import './placeorder.scss';
import { storeContext } from '../../context/storeContext';
import {useNavigate} from 'react-router-dom';
import requestax from '../../../axios';

const PlaceOrder = () => {
    const { getTotalCart, food_list, cartItems } = useContext(storeContext);
    const token = localStorage.getItem('token')
    const [data, setData] = useState({
        firstname:"",
        lastname: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    })

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData(data => ({...data,[name]:value}))
    }

    const placeOrder = async(e) => {
        e.preventDefault();
        let orderItems = [];
        food_list.map((item) => {
            if(cartItems[item._id]>0) {
                let itemInfo = item;
                itemInfo['quantity'] = cartItems[item._id];
                orderItems.push(itemInfo)
            }
        })
        let orderData = {
            infoDel: data,
            items: orderItems,
            amount: getTotalCart()+2,
        }
        let response = await requestax.post("/order/place",orderData,{headers:{token}})
        if (response.data.success) {
            const {session_url} = response.data;
            window.location.replace(session_url)
        }   else {
            alert("Error");
        }
        //console.log(orderItems);
    }

    const navigate = useNavigate();
    useEffect(() => {
        if(!token) {
            navigate("/cart");
        } else if (getTotalCart() === 0) {
            navigate("/cart")
        }
    },[token])
    /*
    useEffect(() => {
        console.log(data);
    },[data])
    */
    return (
        <form onSubmit={placeOrder} className="place-order">
            <div className="left">
                <p className="title">Delivery Information</p>
                <div className="multi-fields">
                    <input required name="firstname" value={data.firstname} onChange={onChangeHandler} type="text" placeholder="First name" />
                    <input required name="lastname" value={data.lastname} onChange={onChangeHandler} type="text" placeholder="Last name" />
                </div>
                <input required name="email" value={data.email} onChange={onChangeHandler} type="text" placeholder="Email address" />
                <input required name="street" value={data.street} onChange={onChangeHandler} type="text" placeholder="Street" />
                <div className="multi-fields">
                    <input required name="city" value={data.city} onChange={onChangeHandler} type="text" placeholder="City" />
                    <input required name="state" value={data.state} onChange={onChangeHandler} type="text" placeholder="State" />
                </div>
                <div className="multi-fields">
                    <input required name="zipcode" value={data.zipcode} onChange={onChangeHandler} type="text" placeholder="Zip code" />
                    <input required name="country" value={data.country} onChange={onChangeHandler} type="text" placeholder="Country" />
                </div>
                <input required name="phone" value={data.phone} onChange={onChangeHandler} type="text" placeholder="phone" />
            </div>
            <div className="right">
                <div className="total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="details">
                            <p>Subtotal</p>
                            <p>${getTotalCart()?getTotalCart():0}</p>
                        </div>
                        <hr />
                        <div className="details">
                            <p>Delivery Fee</p>
                            <p>${getTotalCart()===0 ? 0 : 2}</p>
                        </div>
                        <hr />
                        <div className="details">
                            <p>Total</p>
                            <b>${getTotalCart()===0  ? 0 : getTotalCart() + 2}</b>
                        </div>
                    </div>
                    <button type='submit'>PROCEED TO PAYMENT</button>
                </div>
            </div>
        </form>
    );
};

export default PlaceOrder;
