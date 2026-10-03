import express from "express"
import {listProduct,addProduct,editProduct,removeProduct,getProduct} from "../controllers/productController.js"
import upload from "../middleware/multer.js"


const productRoute = express.Router()

productRoute.get("/index",listProduct)
productRoute.post("/add",upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]),addProduct)
productRoute.post("/edit",editProduct)
productRoute.post("/remove",removeProduct)
productRoute.get("/product",getProduct)

export default productRoute