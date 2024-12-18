import React, { useState } from "react";
import "./SellerNavbar.css";
import { useEffect } from "react";
import Cookies from 'js-cookie';
import {decodeToken} from 'react-jwt';
import {Link} from 'react-router-dom'
const SellerNavbar = () => {
    const [username,setuserName] = useState('');
    const [shopname , setshopname]  = useState('');
    useEffect(()=>{
        const token = Cookies.get('authToken');
        console.log(token);
        if(token){
          try {
            const decoded = decodeToken(token);
            console.log(decoded);
            setuserName(decoded.username);
            setshopname(decoded.shopname);
          } catch (error) {
             console.error("token validation failed" ,error);
          }
        }
        else{
            console.log("no user details found");
        }
    },[])
  return (
    
    <div className="sellernavbar-container">
    
      <div className="sellernavbar-header">
        <h3 className="sellernavbar-seller-name"> hello , {username}</h3>
      </div>

    
      <ul className="sellernavbar-links" >
        <li>
            <div style={{display:"flex"}} className="sellernavbardiv">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="sellernavbar-icon" style={{width:'50' , height:'50' , color:'#ffd369'}}>
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V10z" />
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 21V9h6v12" />
</svg>

<Link to="/sellerhome" className="sellernavbar-link">
  Dashboard
</Link>
            </div>
         
        </li>
        <li>
          <div style={{display :"flex"}} className="sellernavbardiv">


          <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
  className="sellernavbar-icon"
  style={{width:'50' , height:'50' , color:'#ffd369'}}
>
  <path d="M3 3h18v4H3z" />
  <path d="M16 21H8a2 2 0 01-2-2V7h12v12a2 2 0 01-2 2z" />
  <path d="M12 11v6" />
  <path d="M9 11v6" />
  <path d="M15 11v6" />
</svg>


<Link to="/seller/orders" className="sellernavbar-link">
  Orders
</Link>

          </div>
        </li>
        <li>
        <div style={{display:'flex'}} className="sellernavbardiv">
        <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
  className="sellernavbar-icon"
  style={{ width: '50px', height: '50px', color: '#FFD369' }}
>
  <path d="M20.59 13.41l-8.59 8.59a2 2 0 01-2.83 0L3 15.83a2 2 0 010-2.83l8.59-8.59a2 2 0 012.83 0l6.17 6.17a2 2 0 010 2.83z" />
  <path d="M7 7h.01" />
</svg>

<Link to="/seller/products" className="sellernavbar-link">
  Products
</Link>
        </div>
        </li>

        <li>
          <div style={{display:'flex'}} className="sellernavbardiv">
          <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
  className="sellernavbar-icon"
  style={{ width: '45px', height: '45px', color: '#FFD369', marginTop:'10px' }}
>
  <circle cx="12" cy="12" r="3" />
  <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2h-1.16a2 2 0 01-2-2v-.19a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2v-1.16a2 2 0 012-2h.19a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33h.16a1.65 1.65 0 001-1V3a2 2 0 012-2h1.16a2 2 0 012 2v.19a1.65 1.65 0 001 1 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82v.16a1.65 1.65 0 001 1h.19a2 2 0 012 2v1.16a2 2 0 01-2 2h-.19a1.65 1.65 0 00-1 1z" />
</svg>

<Link to="/seller/settings" className="sellernavbar-link">
  Settings
</Link>
          </div>
        </li>
      </ul>

      <div className="sellernavbar-footer">
        <p className="sellernavbar-shop-name">{shopname}</p>
      </div>
    </div>
  
  );
};

export default SellerNavbar;
