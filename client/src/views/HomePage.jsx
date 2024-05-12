import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const [artworks, setArtworks] = useState([]);
    const [selectedArtworkIndex, setSelectedArtworkIndex] = useState(0);

    useEffect(() => {
        axios.get("http://localhost:8000/api/artworks")
            .then(response => {
                console.log(response.data)
                setArtworks(response.data)
            })
            .catch();
    }, []);

    const handleImageClick = (index) => {
        setSelectedArtworkIndex(index);
    };

    const handleKeyPress = useCallback(
        (e) => {
            if (e.key === 'ArrowLeft') {
                setSelectedArtworkIndex(prevIndex => (prevIndex - 1 + artworks.length) % artworks.length);
            } else if (e.key === 'ArrowRight') {
                setSelectedArtworkIndex(prevIndex => (prevIndex + 1) % artworks.length);
            }
        },
        [artworks.length]
    );

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleKeyPress]);

    const selectedArtwork = artworks[selectedArtworkIndex];

    const rows = artworks.reduce((rows, key, index) => (index % 6 === 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) && rows, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {selectedArtwork && (
                <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                    <div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img
                            src={selectedArtwork.imageUrl}
                            alt="Selected Artwork"
                            style={{
                                maxWidth: '100%',
                                maxHeight: '100%',
                                width: 'auto',
                                height: 'auto',
                            }}
                        />
                    </div>
                    <h2>{selectedArtwork.title}</h2>
                    <div>
                        <span style={{ fontSize: 'smaller', textTransform: 'lowercase' }}>
                            <Link to={`/dets/${selectedArtwork._id}`}>details</Link>
                            <span> | </span>
                            <Link to={`/update/${selectedArtwork._id}`}>edit</Link>
                        </span>
                    </div>
                </div>
            )}
            <table style={{ display: 'inline-table', tableLayout: 'fixed' }}>
                <tbody>
                    {rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((artwork, index) => (
                                <td key={index} style={{ width: '100px', height: '100px', textAlign: 'center', verticalAlign: 'middle' }}>
                                    {artwork.imageUrl && (
                                        <img
                                            src={artwork.imageUrl}
                                            alt={artwork.title}
                                            style={{
                                                maxWidth: '100%',
                                                maxHeight: '100%',
                                                width: 'auto',
                                                height: 'auto',
                                                cursor: 'pointer',
                                                display: 'inline-block',
                                            }}
                                            onClick={() => handleImageClick(artworks.findIndex(item => item._id === artwork._id))}
                                        />
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default HomePage;
