import { useState } from 'react';
import { toast } from 'react-toastify';
import './order.scss';
import { useEffect } from 'react';
import { assets } from '../../assets/assets';
import requestax from '../../../axios';

const Order = () => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await requestax.get("/order/list");
    if(response.data.success) {
      setOrders(response.data.data)
      console.log(response.data.data);
    } else {
      toast.error("Error");
    }
  }

  const statusHandler = async (e, orderId) => {
    //console.log(e, orderId)
    const response = await requestax.post("/order/status",{
      orderId,
      status: e.target.value
    })
    if(response.data.success) {
      await fetchAllOrders();
    }
  }

  useEffect(() => {
    fetchAllOrders();
  },[])

  return (
    <div className="order add">
      <h3>Order page</h3>
      <div className="list">
        {orders.map((order,index) => (
          <div key={index} className="item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className='food'>
                {order.items.map((item,index) => {
                  if(index===order.items.length-1){
                    return item.name + " x "+item.quantity;
                  } else {
                    return item.name + " x "+item.quantity+", ";
                  }
                })}
              </p>
              <p className="name">{ order.address.firstname+" "+order.address.lastname}</p>
              <div className="address">
                <p>{order.address.street+","}</p>
                <p>{order.address.city+", "+order.address.state+", "+order.address.country+", "+order.address.zipcode}</p>
              </div>
              <p className='phone'>{order.address.phone}</p>
            </div>
            <p>Item : {order.items.length}</p>
            <p>${order.amount}</p>
            <select onChange={(e) => statusHandler(e,order._id)} value={order.status}>
              <option value="Food processing">Food processing</option>
              <option value="Our food delivery">Our food delivery</option>
              <option value="Deliveried">Deliveried</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Order
