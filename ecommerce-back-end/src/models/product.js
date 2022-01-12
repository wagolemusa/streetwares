// import { Schema, model } from "mongoose"

const mongoose = require('mongoose')
const  ProductSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    price : {
        type: Number,
        required: true
    },
    quantity : {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    offer: {
        type: Number
    },
    productPictures: [
        { img: { type: String }}
    ],
    reviews: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
            reviews: String
        }
    ],
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    updatedAt: Date,
}, {timestamps: true });


// const Product = model("product", ProductSchema);
// export default Product;

module.exports = mongoose.model('Product', ProductSchema)