import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const AddArtwork = () => {
    const navigate = useNavigate();
    const [artwork, setArtwork] = useState({
        title: "",
        year: 0,
        medium: "",
        size: "",
        additionaldetails: "",
        imageUrl: ""
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setArtwork({ ...artwork, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: null });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!artwork.imageUrl) {
            setErrors({ imageUrl: "Image URL is required" });
            return;
        }

        axios.post("http://localhost:8000/api/artworks", artwork)
            .then(response => {
                navigate("/");
            })
            .catch(err => {
                console.log(err);
                setErrors(err.response.data.errors);
            });
    };

    return (
        <div style={{ marginTop: '10px' }}>
            <form onSubmit={handleSubmit}>
                <table>
                    <tbody>                        
                        <tr>
                            <td>Image URL:</td>
                            <td>
                                <input 
                                    type="text" 
                                    name="imageUrl" 
                                    value={artwork.imageUrl} 
                                    onChange={handleChange} 
                                    style={{ width: '300px', border: errors.imageUrl ? '1px solid red' : '1px solid black' }}
                                />
                                {errors.imageUrl && <p className="error" style={{ fontSize: 'smaller' }}>{errors.imageUrl}</p>}
                            </td>
                        </tr>
                        <tr>
                            <td>Artwork Title:</td>
                            <td>
                                <input 
                                    type="text" 
                                    name="title" 
                                    value={artwork.title} 
                                    onChange={handleChange} 
                                    style={{ width: '300px', border: errors.title ? '1px solid red' : '1px solid black' }}
                                />
                                {errors.title && <p className="error" style={{ fontSize: 'smaller' }}>{errors.title.message}</p>}
                            </td>
                        </tr>
                        <tr>
                            <td>Year:</td>
                            <td>
                                <input 
                                    type="number" 
                                    name="year" 
                                    value={artwork.year} 
                                    onChange={handleChange} 
                                    style={{ width: '300px', border: errors.year ? '1px solid red' : '1px solid black' }}
                                />
                                {errors.year && <p className="error" style={{ fontSize: 'smaller' }}>{errors.year.message}</p>}
                            </td>
                        </tr>
                        <tr>
                            <td>Medium:</td>
                            <td>
                                <input 
                                    type="text" 
                                    name="medium" 
                                    value={artwork.medium} 
                                    onChange={handleChange} 
                                    style={{ width: '300px', border: errors.medium ? '1px solid red' : '1px solid black' }}
                                />
                                {errors.medium && <p className="error" style={{ fontSize: 'smaller' }}>{errors.medium.message}</p>}
                            </td>
                        </tr>
                        <tr>
                            <td>Size:</td>
                            <td>
                                <input 
                                    type="text" 
                                    name="size" 
                                    value={artwork.size} 
                                    onChange={handleChange} 
                                    style={{ width: '300px', border: errors.size ? '1px solid red' : '1px solid black' }}
                                />
                                {errors.size && <p className="error" style={{ fontSize: 'smaller' }}>{errors.size.message}</p>}
                            </td>
                        </tr>
                        <tr>
                            <td>Additional Details:</td>
                            <td>
                                <textarea
                                    rows="4"  
                                    name="additionaldetails" 
                                    value={artwork.additionaldetails} 
                                    onChange={handleChange} 
                                    style={{ width: '300px', border: errors.additionaldetails ? '1px solid red' : '1px solid black' }}
                                />
                                {errors.additionaldetails && <p className="error" style={{ fontSize: 'smaller' }}>{errors.additionaldetails.message}</p>}
                            </td>
                        </tr>

                    </tbody>
                </table>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                <button 
                    type="submit" 
                    style={{ 
                        marginTop: '10px',
                        padding: '8px 16px',
                        backgroundColor: '#3C3C3C',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                    }}
                >
                    create
                </button>
                </div>
            </form>
        </div>
    );
};

export default AddArtwork;
