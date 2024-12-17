
import Index1 from "./Index1.js";
import './App.css'
import { BrowserRouter as Router , Route, Routes} from 'react-router-dom'
import Login from "./seller/login.js";
function App() {
  return (
    <div className="App">
      <Router>
  
          <Routes>
            <Route path="/" element={<Index1></Index1>}></Route>
            <Route path="/seller-login" element={<Login></Login>}></Route>
          </Routes>
  
      </Router>
    </div>
  );
}

export default App;
