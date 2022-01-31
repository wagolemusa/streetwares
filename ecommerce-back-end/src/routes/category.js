import Category from "../models/category";
import { Router } from "express";
import { requiresSignin, adminMiddleware } from "../middlewares";
const slugify = require('slugify')
const router = Router();
const shortid = require('shortid')
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, shortid.generate() + '-' + file.originalname)
    }
  })
 const upload = multer({ storage })


function createCategories(categories, parentId = null){
    const categoryList = [];
    let category;
    if(parentId == null){
        category = categories.filter(cat => cat.parentId == undefined);
    }else{
        category = categories.filter(cat => cat.parentId == parentId);
    }
    for( let cate of category) {
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            parentId: cate.parentId,
            children: createCategories(categories, cate._id)
        });
    }
    return categoryList;
}


router.post('/category/create',requiresSignin, adminMiddleware, upload.single('categoryImage'), async(req, res) => {
    try{
       
        const catagoryObj ={
            name: req.body.name,
            slug: slugify(req.body.name),

        }
        if(req.file){
            catagoryObj.categoryImage = process.env.APP_DOMAIN + '/public/' + req.file.filename;
        }

        if (req.body.parentId){
            catagoryObj.parentId = req.body.parentId;
        }
        const cat = new Category(catagoryObj);
        await cat.save((error, category) =>{
            if(error) return res.status(400).json({ error });
            if(category){
                return res.status(201).json({ category });
            }
        });

    }catch(error){
        console.log("ERR", error.message)
    }

});

router.get('/category/getcategories', (req, res) => {
    try{
        Category.find({})
        .exec((error, categories) => {
            if(error) return res.status(400).json({ error });
            if(categories){
                
                const  categoryList = createCategories(categories);

                res.status(200).json({ categoryList })

            }
        })

    }catch(error){
        console.log("ERR", error.message)
    }
})

export default router;