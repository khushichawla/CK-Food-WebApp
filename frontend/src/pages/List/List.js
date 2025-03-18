import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data);
      const uniqueCategories = [...new Set(response.data.data.map(item => item.category))];
      setCategories(uniqueCategories);
    } else {
      toast.error("Error fetching food list");
    }
  };

  const toggleDisplay = async (foodId, currentStatus) => {
    const response = await axios.post(`${url}/api/food/toggleDisplay`, { id: foodId, display: !currentStatus });
    if (response.data.success) {
      toast.success(response.data.message);
      await fetchList(); 
    } else {
      toast.error("Error toggling display");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const filteredList = selectedCategory 
    ? list.filter(item => item.category === selectedCategory) 
    : list;

  // Sort the filtered list alphabetically by name
  const sortedList = filteredList.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className='list add flex-col'>
      <p className='heading'>Food List:</p>

      {/* Filter Section */}
      <div className='filter-section'>
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)} 
          className='filter-dropdown'
        >
          <option value=''>All</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className='list-table'>
        <div className='list-table-format title'>
          <p>Image</p>
          <p>Name</p>
          <p>Price</p>
          <p>Action</p>
        </div>
        {sortedList.map((item, index) => (
          <div key={index} className='list-table-format'>
            <img src={`${url}/images/${item.image}`} alt="" />
            <p>{item.name}</p>
            <p>$ {item.price}</p>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={item.display} 
                onChange={() => toggleDisplay(item._id, item.display)} 
              />
              <span className="slider"></span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;