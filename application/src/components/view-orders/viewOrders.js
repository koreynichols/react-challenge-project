import React, { Component } from 'react';
import { Template } from '../../components';
import { SERVER_IP } from '../../private';
import { Link } from "react-router-dom";

import './viewOrders.css';

const DELETE_ORDER_URL = `${SERVER_IP}/api/delete-order`

class ViewOrders extends Component {
    state = {
        orders: []
    }

    componentDidMount() {
        fetch(`${SERVER_IP}/api/current-orders`)
            .then(response => response.json())
            .then(response => {
                if(response.success) {
                    this.setState({ orders: response.orders });
                } else {
                    console.log('Error getting orders');
                }
            });
    }

    deleteOrder(order_id){
        fetch(DELETE_ORDER_URL, {
            method: 'POST',
            body: JSON.stringify({
                id: order_id,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.status === 200){
            this.componentDidMount()
            }
        })
        .catch(error => console.error(error));
    }

    render() {
        return (
            <Template>
                <div className="container-fluid">
                    {this.state.orders.map(order => {
                        const createdDate = new Date(order.createdAt);
                        return (
                            <div className="row view-order-container" key={order._id}>
                                <div className="col-md-4 view-order-left-col p-3">
                                    <h2>{order.order_item}</h2>
                                    <p>Ordered by: {order.ordered_by || ''}</p>
                                </div>
                                <div className="col-md-4 d-flex view-order-middle-col">
                                    <p>Order placed at {`${createdDate.getHours()}:${createdDate.getMinutes()}:${createdDate.getSeconds()}`}</p>
                                    <p>Quantity: {order.quantity}</p>
                                 </div>
                                 <div className="col-md-4 view-order-right-col">
                                 <Link to={{pathname:"/order", state: { id: order._id, order_item: order.order_item, quantity: order.quantity }}} className="nav-link">
                                 <button className="btn btn-success">Edit</button>
                                </Link>
                                     <button className="btn btn-danger" onClick={() => this.deleteOrder(order._id)}>Delete</button>
                                 </div>
                            </div>
                        );
                    })}
                </div>
            </Template>
        );
    }
}

export default ViewOrders;
