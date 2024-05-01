import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Items.css";
import image1 from "./images/air_filter.jpg";
import image2 from "./images/bumper.jpg";
import image3 from "./images/chair.jpg";
import image4 from "./images/headlight_bulb.jpg";
import image5 from "./images/mirror.jpg";
import image6 from "./images/oil.jpg";
import image7 from "./images/oil_filter.jpg";
import image8 from "./images/radiator.jpg";
import image9 from "./images/rear_door.jpg";
import image10 from "./images/side_mirror.jpg";

function Items() {

    const Items = [
        { id: 1, name: 'Air Filter', image: image1, description: 'New Air Filter', price: 19.99 },
        { id: 2, name: 'Front Bumper', image: image2, description: 'Description for Item 2', price: 19.99 },
        { id: 3, name: 'Car Chair', image: image3, description: 'Description for Item 1', price: 19.99 },
        { id: 4, name: 'Front Headlight Bulb', image: image4, description: 'Description for Item 2', price: 19.99 },
        { id: 5, name: 'Middle  Mirror', image: image5, description: 'Description for Item 1', price: 19.99 },
        { id: 6, name: 'Oil Filter', image: image6, description: 'Description for Item 2', price: 19.99 },
        { id: 7, name: 'Oil 5W40', image: image7, description: 'Description for Item 1', price: 19.99 },
        { id: 8, name: 'Radiator', image: image8, description: 'Description for Item 2', price: 19.99 },
        { id: 9, name: 'Rear Door', image: image9, description: 'Description for Item 1', price: 19.99 },
        { id: 10, name: 'Side Mirror', image: image10, description: 'Description for Item 2', price: 19.99 }
    ];

    const [items, setItems] = useState(Items);
    const [orderId, setOrderId] = useState(null);

    useEffect(() => {
        axios.get('/order/current')
            .then(response => {
                if (response.data) {
                    setOrderId(response.data.id);
                } else {
                    console.log('No current order found');
                }
            })
            .catch(error => {
                console.error('Error fetching orderId:', error);
            });
    }, []);

    const handleAddToOrder = (itemId) => {
        const selectedItem = items.find(item => item.id === itemId);
        if (selectedItem) {
            const itemData = {
                id: selectedItem.id,
                name: selectedItem.name,
                price: selectedItem.price
            };
            addItemToOrder(orderId, itemData);
        }
    };

    const addItemToOrder = (orderId, itemData) => {
        console.log('Order ID:', orderId);
        console.log('Item Data:', itemData);
        axios.post(`/order/${orderId}/addItems`, itemData)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log('Error adding items to order:', error);
            });
    };

    return(
    
    <div className="App">
        <h1 className="heading">Spare Parts For Your Car. Best Prices, Guaranteed !</h1>
            <div className="grid-container">
            {items.map((item) => (
                <div key={item.id} className="grid-item">
                <img src={item.image} alt={item.name} />
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p>${item.price.toFixed(2)}</p>
                <button 
                    onClick={() => handleAddToOrder(item.id)}
                    disabled={item.stock === 0}
                    >Add to Cart</button>
                </div>
            ))}
            </div>
    </div>
    );
}

export default Items;