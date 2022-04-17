import './App.css';
import { Routes, Route } from "react-router-dom";
import BoostrapForm from './components/BoostrapForm';
import ConfirmYourDetails from './components/ConfirmYourDetails';
import Congratulation from './components/Congratulation';

const App = ()=> {
  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<BoostrapForm />} />
        <Route path="/confirm" element={<ConfirmYourDetails />} />
        <Route path="/congratulation" element={<Congratulation />} /> 
      </Routes>
    </div>
  );
}

export default App;
