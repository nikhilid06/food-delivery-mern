import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems = {}, addToCart, removeFromCart, url = '' } = useContext(StoreContext)

 
  const imageSrc = image?.startsWith('http') || image?.startsWith('/') 
    ? image 
    : `${url}/images/${image}`

  const count = cartItems[id] || 0

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img 
          className="food-item-image" 
          src={imageSrc} 
          alt={name || 'Food item'} 
        />

        {count === 0 ? (
          <img
            className="add"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt="Add to cart"
            role="button"
            tabIndex={0}
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt="Decrease quantity"
              role="button"
              tabIndex={0}
            />
            <p>{count}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt="Increase quantity"
              role="button"
              tabIndex={0}
            />
          </div>
        )}
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts || assets.rating_stars} alt="Rating" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  )
}

export default FoodItem