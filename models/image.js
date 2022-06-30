const mongoose = require("mongoose");
const Joi = require("joi");

const imageSchema = new mongoose.Schema({
  filename: {
    type: String,
    unique: true,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
  },
  imageBase64: {
    type: String,
    required: true,
  },
});

// const uniqueFilename=(value, helpers)=>{
//   if(helpers.error){
//     return helpers.error;
//   }

//   const filename= await Image
// }

const validateImage = (image) => {
  const schema = Joi.object({
    projectId: Joi.objectId().required(),
  });

  return schema.validate(image);
};

const Image = mongoose.model("images", imageSchema);

exports.validateImage = validateImage;
exports.Image = Image;
