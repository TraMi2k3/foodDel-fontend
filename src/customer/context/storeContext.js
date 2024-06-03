import { createContext, useEffect, useState } from 'react';
import requestax from '../../axios';

export const storeContext = createContext(null);
const StoreContextProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState({});
    const token = localStorage.getItem('token');
    const [food_list, setFoodList] = useState([])

    const addToCart = async(itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        if(token) {
            await requestax.post("/cart/add",{itemId},{headers:{token}})
        }
    };
    const addToCartWithNumber = async(itemId, quantities) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: quantities}));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + quantities }));
        }
        if(token) {
            await requestax.post("/cart/addnb",{itemId, quantities},{headers:{token}})
        }
    };
    const removeFromCart = async(itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if(token) {
            await requestax.post("/cart/remove",{itemId},{headers:{token}})
        }
    };

    const deleteFromCart = async(itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: 0 }));
        if(token) {
            await requestax.post("/cart/del",{itemId},{headers:{token}})
        }
    }

    useEffect(() => {
        console.log(cartItems);
    }, [cartItems]);

    const getTotalCart = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo?.price * cartItems[item];
            }
        }
        return totalAmount;
    };

    const fetchFoodList = async () => {
        const response = await requestax.get("/food/list");
        setFoodList(response.data.data)
    }

    const loadCartData = async (token) => {
        const response = await requestax.post("/cart/get",{}, {headers:{token}})
        setCartItems(response.data.cartData)
    }

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if(localStorage.getItem("token")){
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    },[])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        addToCartWithNumber,
        removeFromCart,
        deleteFromCart,
        getTotalCart,
    };

    return <storeContext.Provider value={contextValue}>{children}</storeContext.Provider>;
};
export default StoreContextProvider;
