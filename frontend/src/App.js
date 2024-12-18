import Index1 from "./Index1.js";
import './App.css'
import { BrowserRouter as Router , Route, Routes} from 'react-router-dom';
import Login from "./seller/login.js";
import SellerNavbar from "./seller/Sellerdashboard.js";  // Local change

import BuyerLogin from "./buyer/buyerlogin.js";  // Remote change
import BuyerSignup from "./buyer/buyersignup.js"; // Remote change

function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
            <Route path="/" element={<Index1></Index1>}></Route>
            <Route path="/seller-login" element={<Login></Login>}></Route>
            <Route path="/sellerhome" element={<><SellerNavbar></SellerNavbar></>}></Route>
            <Route path="/buyer-login" element={<BuyerLogin></BuyerLogin>}></Route>
            <Route path="/buyer-signup" element={<BuyerSignup></BuyerSignup>}></Route>
          </Routes>
      </Router>
    </div>
  );
}

export default App;
