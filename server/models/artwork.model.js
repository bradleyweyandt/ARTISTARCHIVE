import {model, Schema} from 'mongoose';

const ArtworkSchema = new Schema({
    title: {
        type: String,
        required: [true, "Artwork title required!"],
        minlength: [3, "Must be at least 3 characters"],
        maxlength: [20, "Must be less than 20 characters"]
    },

    year:{
        type: Number,
        required: [true, "Year required!"],
        min: [1900, 'Year must be greater than 1900'],
        max: [2050, 'Year must be less than 2050']
    },

    medium:{
        type: String,
        required: [true, "Artwork medium required!"],
        minlength: [3, "Must be at least 3 characters"]
    },
    size: {
        type: String
    },
    additionaldetails: {
        type: String
    },
    imageUrl: {
        type: String
    }

    
    
},
{ timestamps: true }
);

const Artwork = model("Artwork", ArtworkSchema)
export default Artwork