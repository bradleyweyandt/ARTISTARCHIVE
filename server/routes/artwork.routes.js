import { Router } from "express";
import {    getAllArtworks, createArtwork,  getOneArtwork,
   
    updateArtwork,
    deleteArtwork} from '../controllers/artwork.controller.js'

const router = Router();

router.route("/artworks")
    .get( getAllArtworks )
    .post( createArtwork )

router.route("/artwork/:id")
    .get( getOneArtwork )
    .put( updateArtwork )
    .delete( deleteArtwork)

export default router;