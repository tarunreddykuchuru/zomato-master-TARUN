//Libraries
//require('dotenv').config();
import express from "express";
import AWS from "aws-sdk";
import multer from "multer";

//Database model
import {ImageModel} from "../../database/allModels";

//Utilities
import {s3Upload} from "../../Utils/AWS/s3";

const Router = express.Router();
//
// const s3Bucket = new AWS.S3({
//   accessKeyId: process.env.AWS_S3_ACCESS_KEY,
//   secretAccessKey:process.env.AWS_S3_SECRET_KEY,
//   region:"ap-south-1"
// })
//Multer config
const storage = multer.memoryStorage();
const upload = multer({storage});


// const s3Upload =(options)=>{
//   return new Promise((resolve,reject)=>{
//     s3Bucket.upload(options,(error,data)=>{
//       if(error) return reject(error);
//       return resolve(data);
//     })
//   });
// };


/*
Route            /
Des              Uploading given image to S3 bucket , and then saving the file to mongodb
Params           None
Access           Public
Method           POST
*/

Router.post("/", upload.single("file") ,async(req,res)=> {
  try {
 const file = req.file;

 //S3 bucket options
 const bucketOptions = {
   Bucket: "shapeaijuly",
   Key: file.originalname,
   Body: file.buffer,
   ContentType: file.mimetype,
   ACL: "public-read"
 };


 const uploadImage = await s3Upload(bucketOptions);

 return res.status(200).json({ uploadImage });

  } catch (error) {
return res.status(500).json({error: error.message});
  }
});

export default Router;
