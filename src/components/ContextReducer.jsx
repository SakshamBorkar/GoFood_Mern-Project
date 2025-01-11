import React, { createContext, useContext, useReducer } from 'react';

// Contexts
const CartStateContext = createContext();
const CartDispatchContext = createContext();

// Reducer
const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            // console.log("Action received:", action);
            // console.log("State before update:", state);
            const updatedState = [
                ...state,
                {
                    id: action.id,
                    name: action.name,
                    price: action.price,
                    img: action.img,
                    qty: action.qty,
                    size: action.size,
                },
            ];
            return updatedState;
        case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr;
        case "UPDATE":
            let arr = [...state]
            arr.find((food, index) => {
                if (food.id === action.id) {
                    console.log(food.qty, parseInt(action.qty) + action.price + food.price);
                    arr[index] = { ...food, qty: parseInt(action.qty) + food.qty, price: action.price + food.price }
                }
                return arr
            })
            return arr;
        case "DROP":
            let empArray = []
            return empArray;
        // console.log("State after update:", updatedState);
        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
};

// Provider
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []);

    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    );
};

// Hooks
export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
