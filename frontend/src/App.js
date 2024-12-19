import Index1 from "./Index1.js";
import './App.css'
import { BrowserRouter as Router , Route, Routes} from 'react-router-dom';
import Login from "./seller/login.js";
import SellerNavbar from "./seller/Sellernabvar.js";  // Local change
import SellerDashboard from "./seller/Dashboard.js";
import BuyerLogin from "./buyer/buyerlogin.js";  // Remote change
import BuyerSignup from "./buyer/buyersignup.js"; // Remote change

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
            <Route path="/seller/products" element={<><SellerNavbar></SellerNavbar></>}></Route>
           
            <Route path="/seller/settings" element={<><SellerNavbar></SellerNavbar></>}></Route>
            <Route path="/seller/orders" element={<><SellerNavbar></SellerNavbar></>}></Route>
            <Route path="/buyer-login" element={<BuyerLogin></BuyerLogin>}></Route>
            <Route path="/buyer-signup" element={<BuyerSignup></BuyerSignup>}></Route>
          </Routes>
      </Router>
    </div>
  );
}

export default App;
