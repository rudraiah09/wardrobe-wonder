import Index1 from "./Index1.js";
import './App.css'
import { BrowserRouter as Router , Route, Routes} from 'react-router-dom';
import Login from "./seller/login.js";
import SellerNavbar from "./seller/Sellernabvar.js";  // Local change
import SellerDashboard from "./seller/Dashboard.js";
import BuyerLogin from "./buyer/buyerlogin.js";  // Remote change
import BuyerSignup from "./buyer/buyersignup.js"; // Remote change

import ProductList from "./seller/Products.js";

import BuyerHome from "./buyer/BuyerHome.js";
import BuyerProfile from "./buyer/BuyerProfile";
import BuyerCart from "./buyer/BuyerCart.js";
import BuyerOrders from "./buyer/BuyerOrders.js";
import BuyerWishlist from "./buyer/BuyerWishlist.js";


import AdminLogin from "./admin/AdminLogin.jsx";

function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
            <Route path="/" element={<Index1></Index1>}></Route>
            <Route path="/admin-login" element={<AdminLogin></AdminLogin>}></Route>
            <Route path="/seller-login" element={<Login></Login>}></Route>
            <Route path="/sellerhome" element={<div style={{display:'flex'}}><SellerNavbar></SellerNavbar><SellerDashboard></SellerDashboard></div>}></Route>
            <Route
  path="/seller/products"
  element={
    <div style={{ display: 'flex', overflow: 'hidden', height: '100vh' }}>
      <SellerNavbar />
      
        <ProductList />
      </div>
    
  }
/>
           
            <Route path="/seller/settings" element={<><SellerNavbar></SellerNavbar></>}></Route>
            <Route path="/seller/orders" element={<><SellerNavbar></SellerNavbar></>}></Route>

            {/* Buyer Routes */}
            <Route path="/buyer-login" element={<BuyerLogin></BuyerLogin>}></Route>
            <Route path="/buyer-signup" element={<BuyerSignup></BuyerSignup>}></Route>
            <Route path="/buyerhome" element={<BuyerHome></BuyerHome>}></Route>
            <Route path="/buyerprofile" element={<BuyerProfile />} />
            <Route path="/buyercart" element={<BuyerCart />} />
            <Route path="/buyerwishlist" element={<BuyerWishlist />} />
            <Route path="/buyerorders" element={<BuyerOrders />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
