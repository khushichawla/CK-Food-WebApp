import React from 'react'
import './Add.css'

const Add = () => {
  return (
    <div className='add'>
      <form className='flex-col'>
        <div className='add-image-upload flex-col'>
            <p>Upload Image</p>
            <label htmlFor='image'>
                <img src=""/>
            </label>
            <input type="file" id="image"/>
        </div>
        <div className='add-product-name flex-col'>
            <p>Product Name</p>
            <input type="text" name='name' placeholder='Type here'/>
        </div>
        <div className='add-product-description flex-col'>
            <p>Product description</p>
            <textarea name='description' rows="6" placeholder='Write content here'/>
        </div>
        <div className='add-category-price'>
            <div className='add-category flex-col'>
                <p>Product category</p>
                <select name='category'>
                    <option value='Sides'>Sides</option>
                    <option value='Breads'>Breads</option>
                    <option value='Curries'>Curries</option>
                    <option value='Rice'>Rice</option>
                    <option value='Desserts'>Desserts</option>
                    <option value='Miscellaneous'>Miscellaneous</option>
                </select>
            </div>
            <div className='add-price flex-col'>
                <p>Product price</p>
                <input type='Number' name='price' placeholder='$20'/>
            </div>
        </div>
        <button type='submit' className='add-btn'>Add</button>
      </form>
    </div>
  )
}

export default Add
