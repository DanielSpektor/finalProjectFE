import React, { useEffect, useState } from "react";
import { fetchOrders } from '../services/api';
import OrderItem from './OrderItem';

function OrderList () {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrdersData = async () => {
            try {
                const data = await fetchOrders();
                setOrders(data);
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchOrdersData();
    }, []);

    return(
        <div>
            <h2>Orders</h2>
            {orders.map(order => (
                <OrderItem key={order.id} order={order} />
            ))}
        </div>
    )

}

export default OrderList;