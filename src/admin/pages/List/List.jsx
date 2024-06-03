import { useEffect, useState } from 'react';
import './list.scss';
import { toast } from 'react-toastify';
import requestax from '../../../axios';

const List = () => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await requestax.get(`/food/list`)
    console.log(response.data)
    if(response.data.success) {
      setList(response.data.data)
    }else{
      toast.error("Error")
    }
  }

  const removeFood = async (foodId) => {
    //console.log(foodId)
    const response = await requestax.post(`/food/remove`,{id:foodId})
    await fetchList()
    if (response.data.success) {
      toast.success(response.data.message)
    } else {
      toast.error("Error")
    }
  }

  useEffect(() => {
    fetchList();
  },[])

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="table">
        <div className="table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className="table-format">
              <img src={process.env.BACKEND_URL+'/images/'+item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <p onClick={()=>removeFood(item._id)} className='cursor'>X</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List
