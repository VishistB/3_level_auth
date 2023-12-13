import logo from './logo.svg';
import './App.css';
import Register from './screens/Register';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Otp from './screens/Otp';

function App() {
  return (
    <div className="App">
      <Router>
            <div>
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={
                          <Register/>
                        }
                    ></Route>
                    <Route
                        exact
                        path="/Otp"
                        element={<Otp />}
                    ></Route>
                </Routes>
                {/* <button onClick={dataRefresh}>button</button> */}
            </div>
        </Router>
      
    </div>
  );
}

export default App;
