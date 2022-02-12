import logo from './logo.svg';
import './Styles/App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Text_lessons from './Pages/Text_lessons'
import Physic_const from "./Pages/Physic_const";
import AddConst from "./Pages/AddConst";
const Template = () => (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path="/textlessons/" element={<Text_lessons/>}/>
                <Route path="/physicconst/" element={<Physic_const/>}/>
                <Route path="/addconst/" element={<AddConst/>}/>
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
