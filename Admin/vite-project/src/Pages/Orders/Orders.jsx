import React, { useState, useEffect } from 'react'
import './Orders.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets'

const Order = ({ url }) => {
  const [orders, setOrders] = useState([])

  // 1. Fetch all customer orders from backend
  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`)
      if (response.data.success) {
        setOrders(response.data.data)
      } else {
        toast.error("Failed to load orders")
      }
    } catch (error) {
      console.error("Fetch orders error:", error)
      toast.error("Error connecting to server")
    }
  }

  // 2. Update order delivery/preparation status
  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: event.target.value
      })
      if (response.data.success) {
        await fetchAllOrders()
        toast.success("Order status updated")
      } else {
        toast.error("Failed to update status")
      }
    } catch (error) {
      console.error("Status update error:", error)
      toast.error("Error updating status")
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [])

  return (
    <div className='order add'>
      <h3>Order Management</h3>
      <div className='order-list'>
        {orders.map((order, index) => (
          <div key={index} className='order-item'>
            <img src={assets.parcel_icon} alt='Order Parcel' />
            <div>
              {/* Order Items */}
              <p className='order-item-food'>
                {order.items.map((item, i) => {
                  if (i === order.items.length - 1) {
                    return `${item.name} x ${item.quantity}`
                  } else {
                    return `${item.name} x ${item.quantity}, `
                  }
                })}
              </p>

              {/* Customer Details */}
              <p className='order-item-name'>
                {order.address.firstName} {order.address.lastName}
              </p>
              <div className='order-item-address'>
                <p>{order.address.street},</p>
                <p>
                  {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}
                </p>
              </div>
              <p className='order-item-phone'>{order.address.phone}</p>
            </div>

            {/* Total Count, Price, and Status Selector */}
            <p>Items: {order.items.length}</p>
            <p>${order.amount}</p>
            <select
              onChange={(e) => statusHandler(e, order._id)}
              value={order.status}
            >
              <option value='Food Processing'>Food Processing</option>
              <option value='Out for delivery'>Out for delivery</option>
              <option value='Delivered'>Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Order