import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Employee from "./pages/Employee";
import UserForm from "./pages/CreateEmployee";
import EmployeeDetail from "./pages/DetailEmployee";



function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
       <Route exact path="/" element={<Home/>}/>
       <Route  path="/user" element={<Employee/>}/>
       <Route  path="/employee/:id" element={<EmployeeDetail/>}/>
       <Route  path="/create/employee" element={<UserForm/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
