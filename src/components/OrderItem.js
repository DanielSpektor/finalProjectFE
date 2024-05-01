import React from 'react';

const OrderItem = ({ order }) => {
  return (
    <div>
      <h3>{order.status === 'PENDING' ? 'Pending Order' : 'Closed Order'}</h3>
      <p>Order ID: {order.id}</p>
    </div>
  );
};

export default OrderItem;