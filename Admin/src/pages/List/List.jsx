import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios';
import { toast } from 'react-toastify';
const List = ({url}) => {
  
  const [list, setlist] = useState([]);
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    

    if (response.data.success) {
      setlist(response.data.data)
      
    }
    else {
      toast.error('Error')
    }
  }
  const removeFood = async (foodId) => {
    console.log('Removing food with ID:', foodId); // Debug log
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
    await fetchList();
    toast.success('deleted success')
  };
  
  useEffect(() => {
    fetchList();
  }, [])
  return (
    <div className='list add flex-col'>
      <p>All foood list</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item) => (
          <div key={item._id} className="list-table-format">
            <img src={`${url}/images/` + item.image} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{item.price}</p>
            <p onClick={() => removeFood(item._id)} className="dot">𐤕</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default List