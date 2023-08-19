// react router dom
import { BrowserRouter,Routes,Route,Navigate } from "react-router-dom";

// pages
import Home from "./components/pages/Home";
import Login from "./components/pages/auth/Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;