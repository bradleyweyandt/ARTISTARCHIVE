import Artwork from '../models/artwork.model.js';

async function getAllArtworks(req, res) {
    try {
        const artworks = await Artwork.find();
        res.json(artworks);
    }   catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

async function createArtwork(req, res) {
    try {
        const newArtwork = await Artwork.create(req.body);
        res.json(newArtwork);
    }   catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

async function getOneArtwork(req, res) {
    try {
        const foundArtwork = await Artwork.findById( req.params.id );
        res.json(foundArtwork);
    }   catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

async function updateArtwork(req, res) {
    const option ={
        new: true,
        runValidators: true
    }
    try {
        const updatedArtwork = await Artwork.findByIdAndUpdate( req.params.id, req.body, option );
        res.json(updatedArtwork);
    }   catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

async function deleteArtwork(req, res) {
    try {
        const deletedArtwork = await Artwork.findByIdAndDelete( req.params.id );
        res.json(deleteArtwork);
    }   catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

export {
    getAllArtworks,
    createArtwork,
    getOneArtwork,
    updateArtwork,
    deleteArtwork
}