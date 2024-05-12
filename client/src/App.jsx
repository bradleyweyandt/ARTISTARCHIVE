import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import HomePage from './views/HomePage';
import CreateArtwork from './views/AddArtwork';
import Update from './views/Update';
import ArtworkDetails from './views/ArtworkDetails';
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <div className="container">
                <div className="center-content">
                    <Nav />
                    <Routes>
                        <Route path={"/"} element={<HomePage />} />
                        <Route path={"/create"} element={<CreateArtwork />} />
                        <Route path={"/update/:id"} element={<Update />} />
                        <Route path={"/dets/:id"} element={<ArtworkDetails />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;