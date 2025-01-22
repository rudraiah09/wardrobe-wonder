import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { decodeToken } from 'react-jwt';
import { Link } from 'react-router-dom';
import "../seller/SellerNavbar.css";

const AdminNavbar = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const token = Cookies.get('authToken2');
        if (token) {
            try {
                const decoded = decodeToken(token);
                setUsername(decoded.username);
                setEmail(decoded.email);
            } catch (error) {
                console.error("Token validation failed", error);
            }
        } else {
            console.log("No user details found");
        }
    }, []);

    return (
        <div className="sellernavbar-container">
            <div className="sellernavbar-header">
                <h3 className="sellernavbar-seller-name">Hello, {username}</h3>
            </div>

            <ul className="sellernavbar-links">
                <li>
                    <div className="sellernavbardiv" style={{ display: "flex" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="sellernavbar-icon" style={{ width: '50px', height: '50px', color: '#ffd369' }}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V10z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 21V9h6v12" />
                        </svg>
                        <Link to="/admin/dashboard" className="sellernavbar-link">Dashboard</Link>
                    </div>
                </li>
                <li>
                    <div className="sellernavbardiv" style={{ display: "flex" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sellernavbar-icon" style={{ width: '50px', height: '50px', color: '#ffd369' }}>
                            <path d="M4 4h16v16H4z" />
                            <path d="M9 8h6" />
                            <path d="M9 12h6" />
                        </svg>
                        <Link to="/admin/seller-requests" className="sellernavbar-link">Seller Requests</Link>
                    </div>
                </li>
                <li>
                    <div className="sellernavbardiv" style={{ display: "flex" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sellernavbar-icon" style={{ width: '50px', height: '50px', color: '#ffd369' }}>
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 6v6l4 2" />
                        </svg>
                        <Link to="/admin/sellers" className="sellernavbar-link">Sellers</Link>
                    </div>
                </li>
                <li>
                    <div className="sellernavbardiv" style={{ display: "flex" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sellernavbar-icon" style={{ width: '50px', height: '50px', color: '#ffd369' }}>
                            <path d="M16 3.13a4 4 0 010 7.75" />
                            <path d="M21 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2" />
                            <circle cx="8.5" cy="7" r="4" />
                        </svg>
                        <Link to="/admin/Orders" className="sellernavbar-link">Buyer</Link>
                    </div>
                </li>
                <li>
                    <div className="sellernavbardiv" style={{ display: "flex" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sellernavbar-icon" style={{ width: '50px', height: '50px', color: '#ffd369' }}>
                            <path d="M16 3.13a4 4 0 010 7.75" />
                            <path d="M21 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2" />
                            <circle cx="8.5" cy="7" r="4" />
                        </svg>
                        <Link to="/admin/Orders" className="sellernavbar-link">Orders List</Link>
                    </div>
                </li>
                
            </ul>

            <div className="sellernavbar-footer">
                <p className="sellernavbar-shop-name">{email}</p>
            </div>
        </div>
    );
};

export default AdminNavbar;
