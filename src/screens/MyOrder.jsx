import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
    const [orderData, setOrderData] = useState(null);

    const fetchMyOrder = async () => {
        try {
            const userEmail = localStorage.getItem('userEmail');
            console.log("Fetching orders for userEmail:", userEmail);

            if (!userEmail) {
                console.error("No userEmail found in localStorage");
                return;
            }

            const res = await fetch(//OrderData api here
                , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: userEmail }),
            });

            console.log("Response status:", res.status);

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            const response = await res.json();
            console.log("Order data received from API:", response);

            setOrderData(response);
        } catch (error) {
            console.error("Error fetching order data:", error);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <>
            <div>
                <div>
                    <Navbar />
                </div>
                <div className="container">
                    <div className="row">
                        {orderData && orderData.orderData ? (
                            orderData.orderData.order_data
                                .slice(0)
                                .reverse()
                                .map((item, itemIndex) => (
                                    <div key={itemIndex}>
                                        {Array.isArray(item) ? (
                                            item.map((arrayData, arrayIndex) => (
                                                <div key={`${itemIndex}-${arrayIndex}`}>
                                                    {arrayData.Order_date ? (
                                                        <div className="m-auto mt-5">
                                                            <div>{arrayData.Order_date}</div>
                                                            <hr />
                                                        </div>
                                                    ) : (
                                                        <div className="col-12 col-md-6 col-lg-3">
                                                            <div
                                                                className="card mt-3"
                                                                style={{ width: "16rem", maxHeight: "360px" }}
                                                            >
                                                                {/* <img
                                                                src={arrayData.img}
                                                                className="card-img-top"
                                                                alt={arrayData.name}
                                                                style={{ height: "120px", objectFit: "fill" }}
                                                            /> */}
                                                                <div className="card-body">
                                                                    <h5 className="card-title">{arrayData.name}</h5>
                                                                    <div
                                                                        className="container w-100 p-0"
                                                                        style={{ height: "38px" }}
                                                                    >
                                                                        <span className="m-1">{arrayData.qty}</span>
                                                                        <span className="m-1">{arrayData.size}</span>
                                                                        <span className="m-1">{arrayData.Order_date}</span>
                                                                        <div className="d-inline ms-2 h-100 w-20 fs-5">
                                                                            ₹{arrayData.price}/-
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ))
                                        ) : (
                                            console.error("Unexpected item format:", item)
                                        )}
                                    </div>
                                ))
                        ) : (
                            <div className="text-center mt-3">
                                {orderData === null ? "Loading orders..." : "No orders found"}
                            </div>
                        )}
                    </div>
                </div>
                <div>
                    <Footer />
                </div>
            </div>
        </>
    );
}
