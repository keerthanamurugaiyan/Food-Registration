import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Form from './Component/FoodRegister/Form';
import List from './Component/FoodRegister/List';
import Edit from './Component/FoodRegister/Edit';
import LayOut from './Component/HomePage/LayOut/LayOut';

function App() {
    return (
        <Router>
              <LayOut />
            <Routes>
                <Route path="/foodregistration" element={<Form />} />
                <Route path="/listmanaging" element={<List />} />
                <Route path="/edit/:id" element={<Edit />} />
                {/* <Route path="/foodregistration/:id/edit" element={<Edit />} /> */}
            </Routes>
        </Router>
    );
}

export default App;
