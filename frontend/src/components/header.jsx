import React, { useState, useEffect } from 'react';

const Header = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Format date and time to "21 February, 2025 | 9 : 58 : 00 PM"
    const formatDateTime = (date) => {
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();

        let hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        if (hours === 0) hours = 12;

        // Ensure two-digit minutes and seconds
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
        const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

        return `${day} ${month}, ${year} | ${hours} : ${formattedMinutes} : ${formattedSeconds} ${ampm}`;
    };

    return (
        <div style={{
            width: "100%",
            height: "50px", // Reduced height
            backgroundColor: "rgb(23, 0, 108)", // Dark blue background
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 16px 0 24px", // More left padding, overall reduced padding
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
            top: "0",
            left: "0",
            zIndex: "1000",
            color: "white",
            fontSize: "0.9rem" // Slightly smaller text globally
        }}>
            {/* Left Side - Current Date and Time */}
            <div>
                {formatDateTime(currentTime)}
            </div>

            {/* Right Side - Navigation and controls */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <a href="#main-content" style={{ color: "white", textDecoration: "none" }}>
                    Skip to Main Content
                </a>
                <span style={{ color: "white" }}>|</span>
                <div>
                    <button style={{ margin: "0 3px", fontSize: "0.8rem" }}>-A</button>
                    <button style={{ margin: "0 3px", fontSize: "0.8rem" }}>A</button>
                    <button style={{ margin: "0 3px", fontSize: "0.8rem" }}>+A</button>
                </div>
                <span style={{ color: "white" }}>|</span>
                <select style={{ color: "black", backgroundColor: "white", border: "1px solid #ccc", padding: "2px", fontSize: "0.8rem" }}>
                    <option value="en">English</option>
                    <option value="mr">Marathi</option>
                    <option value="tm">Tamil</option>
                    <option value="ben">Bengali</option>
                </select>
            </div>
        </div>
    );
};

export default Header;
