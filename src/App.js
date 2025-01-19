// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import UseState from "./Component/UseState/UseState";
// import TableComponent from "./Component/UseState/UseStateTable";

// const App = () => {

//   return (

//     <>

//       <Router>
//         <Routes>

//           <Route path="/" element={<UseState />} />
//           <Route path="/view/list" element={<TableComponent />} />

//         </Routes> 
//       </Router>

//     </>

//   );
// };

// export default App;



import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Form from './Component/FoodRegister/Form';
import List from './Component/FoodRegister/List';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/foodregistration" element={<Form />} />
                <Route path="/listmanaging" element={<List />} />
            </Routes>
        </Router>
    );
}

export default App;
