import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function ShowNavBar({ children }) {
    const location = useLocation();
    const [showNavBar, setShowNavBar] = useState(true);

    useEffect(() => {
        if (location.pathname === "/login" || location.pathname === "/signup") {
        setShowNavBar(false);
        } else {
        setShowNavBar(true);
        }
    }, [location]);

    return <div>{showNavBar && children}</div>;
}
