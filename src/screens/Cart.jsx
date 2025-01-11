import React from 'react';
import { useCart, useDispatchCart } from '../components/ContextReducer';
import trash from "../trash.svg";

const Cart = () => {
    const data = useCart();
    const dispatch = useDispatchCart();

    console.log("Cart Data in Component:", data); // Debugging line

    if (data.length === 0) {
        return (
            <div>
                <div className="m-5 w-100 text-center fs-3">The Cart is Empty</div>
            </div>
        );
    }

    const handleCheckOut = async () => {
        let userEmail = localStorage.getItem("userEmail");
        try {
            let response = await fetch("http://localhost:3001/api/orderData", {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    order_data: data,
                    email: userEmail,
                    order_date: new Date().toDateString()
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const json = await response.json();
            
            if (json.success) {
                dispatch({ type: "DROP" });
                alert("Order placed successfully!");
            } else {
                alert("Failed to place order. Please try again.");
            }

        } catch (error) {
            console.error("Error during checkout:", error);
            alert("An error occurred during checkout. Please try again.");
        }
    }

    let totalPrice = data.reduce((total, food) => total + food.price, 0);

    return (
        <div>
            <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
                <table className="table table-hover">
                    <thead className="text-success fs-4">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Options</th>
                            <th scope="col">Amount</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((food, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{food.name}</td>
                                <td>{food.qty}</td>
                                <td>{food.size}</td>
                                <td>{food.price}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn p-0"
                                        onClick={() => dispatch({ type: "REMOVE", index })}
                                    >
                                        <img className='text-white' style={{ filter: 'invert(1)' }} src={trash} alt="Remove" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div>
                    <h2>Total: ₹{totalPrice}</h2>
                    <button className="btn bg-success mt-5" onClick={handleCheckOut}>Check Out</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
