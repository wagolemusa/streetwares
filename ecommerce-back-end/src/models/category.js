const mongoose = require('mongoose')

const  CategorySchema = new mongoose.Schema ({
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
    categoryImage: {
        type: String
    },
    parentId: {
        type: String
    }
}, {timestamps: true });


// const Category = model("categories", CategorySchema);
// export default Category;
module.exports = mongoose.model('Category', CategorySchema)