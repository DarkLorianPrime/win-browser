import logo from './logo.svg';
import './Styles/App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import FoxOS from "./Pages/FoxOS";
const Template = () => (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<FoxOS/>}/>
            </Routes>
        </BrowserRouter>
    </div>
)
function App() {
  return (
      <Template/>
  );
}

export default App;
