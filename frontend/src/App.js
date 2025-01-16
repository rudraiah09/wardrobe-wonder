import Index1 from "./Index1.js";
import './App.css'
import { BrowserRouter as Router , Route, Routes} from 'react-router-dom';
import Login from "./seller/login.js";
import SellerNavbar from "./seller/Sellernabvar.js";  // Local change
import SellerDashboard from "./seller/Dashboard.js";
import BuyerLogin from "./buyer/buyerlogin.js";  // Remote change
import BuyerSignup from "./buyer/buyersignup.js"; // Remote change

import AdminLogin from "./admin/AdminLogin.jsx";
import SellerRequestForm from "./admin/SellerRequestForm.js";
import AdminDashboard from "./admin/AdminDashboard.js"; 
import AdminNavbar from "./admin/Adminnavbar.js";
import SellerDetails from "./admin/seller.js";
import SellerRequests1 from "./admin/SellerRequest.js";

function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
            <Route path="/" element={<Index1></Index1>}></Route>
            <Route path="/admin-login" element={<AdminLogin></AdminLogin>}></Route>
            <Route path="/admindashboard" element={<><AdminNavbar/></>}></Route>
            <Route path="/admin/dashboard" element={<><AdminNavbar/></>}></Route>
            <Route path="/admin/seller-requests" element={<div style={{display:"flex", flexDirection:'row'}} ><><AdminNavbar/><SellerRequests1></SellerRequests1></></div>}></Route>
            <Route path="/admin/sellers" element={<div style={{display:"flex", flexDirection:'row'}}><AdminNavbar/><SellerDetails></SellerDetails></div>}></Route>
            <Route path="/admin/users" element={<><AdminNavbar/></>}></Route>
            <Route path="/sellerRequest-Form" element={<SellerRequestForm></SellerRequestForm>}></Route>
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
