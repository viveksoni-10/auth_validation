const service = require("../models/service_model");

const Services = async (req, res)=>{
  try {
    const response = await service.find();
    if(!response){
      return res.status(404).json({msg: "No service found"});
    }
    res.status(200).json({msg: response});
  } catch (error) {
    console.log("service error",error);
  }
}

module.exports = Services;