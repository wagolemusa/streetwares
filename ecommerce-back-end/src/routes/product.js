import Product from "../models/product";
const Category = require("../models/category");
import { Router } from "express";
import { requiresSignin, adminMiddleware } from "../middlewares";
const slugify = require('slugify')
const multer = require('multer');
const router = Router();
const shortid = require('shortid')
const path = require('path');

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


router.post('/product/create', requiresSignin, upload.array('productPictures'), (req, res) => {

  // res.status(200).json({ file: req.files, body: req.body });
  const { name, price, description, category, createdBy, quantity } = req.body;
  let productPictures = [];

  if (req.files.length > 0) {
    productPictures = req.files.map((file) => {
      return { img: file.location };
    });
  }

  const product = new Product({
    name: name,
    slug: slugify(name),
    price,
    quantity,
    description,
    productPictures,
    category,
    // createdBy: req.user._id,
  });

  product.save((error, product) => {
    if (error) return res.status(400).json({ error });
    if (product) {
      res.status(201).json({ product, files: req.files });
    }
  });
})

export default router;