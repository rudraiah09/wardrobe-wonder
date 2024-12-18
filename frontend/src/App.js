
import Index1 from "./Index1.js";
import './App.css'
import { BrowserRouter as Router , Route, Routes} from 'react-router-dom'
import Login from "./seller/login.js";
import BuyerLogin from "./buyer/buyerlogin.js";
import BuyerSignup from "./buyer/buyersignup.js";
function App() {
  return (
    <div className="App">
      <Router>
  
          <Routes>
            <Route path="/" element={<Index1></Index1>}></Route>
            <Route path="/seller-login" element={<Login></Login>}></Route>
            <Route path="/buyer-login" element={<BuyerLogin></BuyerLogin>}></Route>
            <Route path="/buyer-signup" element={<BuyerSignup></BuyerSignup>}></Route>
          </Routes>
  
      </Router>
    </div>
  );
}

export default App;
