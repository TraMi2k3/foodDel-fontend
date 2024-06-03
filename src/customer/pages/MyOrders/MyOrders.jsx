import { useEffect, useState } from 'react';
import './myorders.scss';
import { asset } from '../../asset/asset';
import requestax from '../../../axios';

const MyOrders = () => {
    const token = localStorage.getItem('token')
    const [data, setData] = useState([]);

    const fetchOrders = async () => {
        const response = await requestax.post("/order/userorders",{},{headers:{token}})
        setData(response.data.data);
        console.log(response.data.data);
    }

    useEffect(() => {
        if(token){
            fetchOrders();
        }
    },[token])

    return (
        <div className="myorders">
            <h2>My orders</h2>
            <div className="container">
                {data.map((order, index) => (              
                    <div key={index} className='myorder'>
                        <img src={asset.parcel_icon} alt="" />
                        <p>{order.items.map((item, index)=>{
                            if(index === order.items.length-1){
                                return item.name+" x "+item.quantity;
                            }else{
                                return item.name+" x "+item.quantity+", ";
                            }
                        })}</p>
                        <p>${order.amount}.00</p>
                        <p>Item: {order.items.length}</p>
                        <p><span>&#x25cf;</span><b>{order.status}</b></p>
                        <button onClick={fetchOrders}>Track Order</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyOrders
