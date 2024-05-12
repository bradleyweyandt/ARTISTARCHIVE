import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

const ArtworkDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [artwork, setArtwork] = useState({
        title: "",
        year: 0,
        medium: "",
        size: "",
        additionaldetails: "",
        imageUrl: ""
    });
    const [selectedImage, setSelectedImage] = useState(null);
    const [artworks, setArtworks] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/artwork/${id}`)
            .then(response => {
                console.log(response);
                setArtwork(response.data);
                setSelectedImage(response.data.imageUrl);
            })
            .catch(err => {
                console.log(err);
            });

        axios.get("http://localhost:8000/api/artworks")
            .then(response => {
                console.log(response.data)
                setArtworks(response.data)
            })
            .catch();
    }, [id]);

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === 'ArrowLeft') {
                navigateToPreviousArtwork();
            } else if (e.key === 'ArrowRight') {
                navigateToNextArtwork();
            }
        };

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [artworks]);

    const navigateToPreviousArtwork = () => {
        const currentIndex = artworks.findIndex(art => art._id === id);
        const previousIndex = currentIndex === 0 ? artworks.length - 1 : currentIndex - 1;
        const previousArtwork = artworks[previousIndex];
        navigate(`/dets/${previousArtwork._id}`);
    };

    const navigateToNextArtwork = () => {
        const currentIndex = artworks.findIndex(art => art._id === id);
        const nextIndex = currentIndex === artworks.length - 1 ? 0 : currentIndex + 1;
        const nextArtwork = artworks[nextIndex];
        navigate(`/dets/${nextArtwork._id}`);
    };

    const handleImageClick = () => {
        setSelectedImage(artwork.imageUrl);
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to remove this artwork?")) {
            axios.delete(`http://localhost:8000/api/artwork/${id}`)
                .then(response => {
                    console.log(response);
                    navigate("/");
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {selectedImage && (
                <div style={{ marginBottom: '20px', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img
                        id="artworkImage"
                        src={selectedImage}
                        alt="Selected Artwork"
                        style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            width: 'auto',
                            height: 'auto',
                            cursor: 'pointer',
                        }}
                        onClick={handleImageClick}
                    />
                </div>
            )}
            <h3>Details of {artwork.title}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <table>
                    <tbody>
                        <tr>
                            <td>Title:</td>
                            <td><input type="text" value={artwork.title} readOnly style={{ width: '300px' }} /></td>
                        </tr>
                        <tr>
                            <td>Medium:</td>
                            <td><input type="text" value={artwork.medium} readOnly style={{ width: '300px' }} /></td>
                        </tr>
                        <tr>
                            <td>Year:</td>
                            <td><input type="number" value={artwork.year} readOnly style={{ width: '300px' }} /></td>
                        </tr>
                        <tr>
                            <td>Size:</td>
                            <td><input type="text" value={artwork.size} readOnly style={{ width: '300px' }} /></td>
                        </tr>
                        <tr>
                            <td>Additional Details:</td>
                            <td><textarea rows="4" value={artwork.additionaldetails} readOnly style={{ width: '300px' }} /></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td style={{ textAlign: 'right' }}>
                                <Link to="#" onClick={handleDelete} style={{ textDecoration: 'none', color: 'red', fontStyle: 'italic', fontSize: 'smaller' }}>remove</Link>
                                {' | '}
                                <Link to={`/update/${id}`} style={{ textDecoration: 'none', color: 'black', fontStyle: 'italic', fontSize: 'smaller' }}>edit</Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ArtworkDetails;
