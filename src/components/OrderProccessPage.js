import React from 'react';
import OrderItem from './OrderItem';

const OrderProcessPage = ({ order, items, onPayment }) => {

    const calculateTotalPrice = () => {
        let totalPrice = 0;
    
        if (order && order.items) {
            order.items.forEach(itemId => {
              const item = items.find(item => item.id === itemId);
              if (item) {
                totalPrice += item.price;
              }
            });
        }
    
        return totalPrice;
    };

  return (
    <div>
      <h2>Order Details</h2>
      {order && order.items && order.items.map(itemId => (
        <OrderItem key={itemId} item={items.find(item => item.id === itemId)} />
      ))}
      <p>Total Price: {calculateTotalPrice()}</p>
    </div>
  );
};

export default OrderProcessPage;