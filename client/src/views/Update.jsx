import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from '../components/Nav';

const Update = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [artwork, setArtwork] = useState({
        title: "",
        year: 0,
        medium: "",
        size: "",
        additionaldetails: "",
        imageUrl: "",
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8000/api/artwork/${id}`)
            .then(response => {
                console.log(response);
                setArtwork(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [id]);

    const handleChange = (e) => {
        setArtwork({ ...artwork, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: null });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/artwork/${id}`, artwork)
            .then(response => {
                navigate(`/dets/${id}`);
            })
            .catch(err => {
                console.log(err);
                setErrors(err.response.data.errors);
            });
    }

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {artwork.imageUrl && (
                    <div style={{ marginBottom: '20px', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img
                            src={artwork.imageUrl}
                            alt="Selected Artwork"
                            style={{
                                maxWidth: '100%',
                                maxHeight: '100%',
                                width: 'auto',
                                height: 'auto',
                                cursor: 'pointer',
                            }}
                        />
                    </div>
                )}
                <h3>Update {artwork.title}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <form onSubmit={handleSubmit}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Title:</td>
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
                                        {errors.imageUrl && <p className="error" style={{ fontSize: 'smaller' }}>{errors.imageUrl.message}</p>}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                            <button 
                                type="button" 
                                onClick={handleSubmit} 
                                style={{ 
                                    padding: '8px 16px',
                                    backgroundColor: '#3C3C3C',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                                }}
                            >
                                update
                            </button>
                        </div>
                    </form>
                    <Nav artworkId={id} />
                </div>
            </div>
        </div>
    );
}

export default Update;
