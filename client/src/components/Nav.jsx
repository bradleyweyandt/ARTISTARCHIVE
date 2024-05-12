import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Nav = ({ artworkId }) => {
    const location = useLocation();
    const isCreatePage = location.pathname === '/create';

    return (
        <div>
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 999, backgroundColor: 'white', padding: '10px' }}>
                <div style={{ marginLeft: '30%' }}>
                    <h1>Artist Archive</h1>
                    <p>{isCreatePage ? "Add a New Artwork to the Archive" : "Here is your archive of artworks!"}</p>
                </div>
            </div>
            <nav style={{ position: 'fixed', top: 0, right: 0, zIndex: 999, padding: '10px' }}>  
                {location.pathname === '/' && <Link to="/create" style={{ fontSize: 'smaller' }}>add an artwork</Link>}
                {location.pathname === '/create' && <Link to="/" style={{ fontSize: 'smaller' }}>back to home</Link>}
                {location.pathname.includes('/dets/') && <Link to="/" style={{ fontSize: 'smaller' }}>back to home</Link>}
                {location.pathname.includes('/update/') && <Link to={`/dets/${artworkId}`} style={{ fontSize: 'smaller' }}>artwork details</Link>}
            </nav>
            <div style={{ paddingTop: '80px', marginLeft: '30%', paddingRight: '10px' }}>
            </div>
        </div>
    );
};

export default Nav;
