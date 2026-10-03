import {v2 as cloudinary} from"cloudinary"
import productModel from "../models/productModel.js"

const listProduct = async(req,res)=>{

}
const addProduct = async(req,res)=>{
    try{
        const {name,description,price,category,subCategory,sizes,bestSeller,data} = req.body
        
        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1,image2,image3,image4].filter((item)=> item !== undefined)

        let imageUrl = await  Promise.all(
            images.map(async(item)=>{
                let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'})
                return result.secure_url
            })
        )

        const productData ={
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestSeller:bestSeller === "true"? true: false,
            sizes: JSON.parse(sizes),
            image:imageUrl,
            date:Date.now()
        }

        console.log(productData)
        
        const product = new productModel(productData)
        await product.save()
        
        res.json({success:true,message:"Product Added!"})
    }
    catch(error){
        res.json({success:false,message:error.message})
    }
}
const editProduct = async(req,res)=>{

}
const removeProduct = async(req,res)=>{

}
const getProduct = async(req,res)=>{

}

export {listProduct,addProduct,editProduct,removeProduct,getProduct}