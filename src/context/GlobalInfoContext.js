import { createContext, useEffect, useState } from 'react';


export const GlobalInfo = createContext();


function GlobalInfoProvider({ children }) {

    const [streak, setStreak] = useState([]);
    const [coupon, setCoupon] = useState(0);

    useEffect(() => {
        if (streak[1] === 5) {
            alert('Congrats you have earned ₹100 coupon.')
            setStreak([]);
            setCoupon(prev => prev + 100);
        }
    }, [streak]);

    return (
        <GlobalInfo.Provider
            value={{
                userStreak: [streak, setStreak],
                coup: [coupon, setCoupon]
            }}>
            {children}
        </GlobalInfo.Provider>
    );
}

export default GlobalInfoProvider;