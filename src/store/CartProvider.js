import { useReducer } from 'react';

import CartContext from './cart-context';

const defaultCartState = {
    items: [],
    totalAmount: 0
};

const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        let updatedItems;
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
        const existingItem = state.items[existingCartItemIndex]
        if (!existingItem) {
            updatedItems = state.items.concat(action.item);//concat builts a new array unlike push which edits the existing array
        } else {
            // updatedItems = [...state.items];
            // updatedItems[index].amount += action.item.amount;
            const updatedItem = {
               ...existingItem,
               amount:existingItem.amount + action.item.amount
           };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }
         
        return {
            items: updatedItems,
            totalAmount: state.totalAmount + action.item.price * action.item.amount
        };
    }
    //     const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
       
    //     const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id)
    //     const existingCartItem = state.items[existingCartItemIndex]       
    //     let updatedItems;

    //     if(existingCartItem){
    //        const updatedItem = {
    //            ...existingCartItem,
    //            amount:existingCartItem.amount + action.item.amount
    //        };
    //        updatedItems = [...state.items] 
    //        updatedItems[existingCartItemIndex] = updatedItem;
    //     }else{
    //         updatedItems = state.items.concat(action.item);
    //     }
    //     // const updatedItems = state.items.concat(action.item);
    //     return {
    //         items: updatedItems,
    //         totalAmount: updatedTotalAmount
    //     };
    // }
    if (action.type === 'REMOVE') { 
            let updatedItems;
            const existingItemIndex = state.items.findIndex(item => item.id === action.id);
            const existingItem = state.items[existingItemIndex]
            if (existingItem.amount === 1) {
                updatedItems = state.items.filter(item => item.id !== action.id);
            } else {
                updatedItems = [...state.items];
                updatedItems[existingItemIndex].amount -= 1;
            }

            return {
                items: updatedItems,
                totalAmount: state.totalAmount - state.items[existingItemIndex].price
            };
        }
        if(action.type === 'CLEAR'){
            return defaultCartState;
        }
       
    //     const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
    //     const existingCartItem = state.items[existingCartItemIndex];
    //     const updatedTotalAmount = state.totalAmount - existingCartItem.price
    //     let updatedItems;

    //     if (existingCartItem === 1) {
    //         updatedItems = state.items.filter(item => item.id !== action.id)
    //         }           
    //     else {
    //         const updatedItem = {
    //             ...existingCartItem,
    //             amount: existingCartItem.amount - 1
    //         }
    //         updatedItems = [...state.items];
    //         updatedItems[existingCartItemIndex] = updatedItem
    //     }
    //     return {
    //         items: updatedItems,
    //         totalAmount: updatedTotalAmount
    // }
    return defaultCartState;
};

const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = (item) => {
        dispatchCartAction({ type: 'ADD', item: item });
    };

    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({ type: 'REMOVE', id: id });
    };
   
    const clearCartHandler = () => {
        dispatchCartAction({type: 'CLEAR'});
    }
    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart: clearCartHandler
    };
  
    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;