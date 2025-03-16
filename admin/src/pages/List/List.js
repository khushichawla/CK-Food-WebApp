import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import {toast} from 'react-toastify'

const List = ({url}) => {
  const [list, setList] = useState([]);
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    console.log(response.data);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error")
    }
  }

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, {id:foodId})
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error");
    }
  }

  const toggleDisplay = async (foodId, currentStatus) => {
    const response = await axios.post(`${url}/api/food/toggleDisplay`, { id: foodId, display: !currentStatus });
    if (response.data.success) {
      toast.success(response.data.message);
      await fetchList(); // Refresh the list after the toggle
    } else {
      toast.error("Error");
    }
  };

  // fetchlist everytime page is refreshed
  useEffect(()=>{
    fetchList();
  },[])

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className='list-table'>
        <div className='list-table-format title'>
          <p>Image</p>
          <p>Name</p>
          <p>Category</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Action</p>
        </div>
        {list.map((item, index)=>{
          return (
            <div key={index} className='list-table-format'>
              <img src={`${url}/images/`+ item.image} alt=""/>
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <p>{item.quantity}</p>
              <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={item.display} 
                    onChange={() => toggleDisplay(item._id, item.display)} 
                  />
                  <span className="slider"></span>
                </label>
              {/* <p onClick={()=>removeFood(item._id)} className='cursor'>X</p> */}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List
