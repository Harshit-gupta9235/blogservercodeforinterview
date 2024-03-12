const Authschema = require("../model/Authschema");
const bcrypt = require("bcrypt");

const signuphandler = async (req, res) => {
  try {
    const { name, username, password } = req.body;
    if(name && username && password){
      const usernameexist=await Authschema.findOne({username})
      if(!usernameexist){
    const hashedpassword = await bcrypt.hash(password, 10);
    const response = await Authschema.create({
      name,
      username,
      password: hashedpassword,
    });
    res.status(201).json({
      success: true,
      data: response,
      message:"registered successfully"
    });
  }
  else{
    res.status(400).json({
      success:false,
      error:"username must be unique"
    })
  }
  }else{
    res.status(400).json({
      success:false,
      error:"all fields must be filled"
    })
  }
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
module.exports = signuphandler;
