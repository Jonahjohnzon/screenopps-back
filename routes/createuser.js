const router = require('express').Router()
const bcrypt = require('bcrypt')
const yup = require('yup')
const user = require('../models/user')



const registrationSchema = yup.object().shape({
    user_name: yup.string().required('Username is required').min(3, 'Username must be at least 3 characters').max(15, 'Username must be at most 20 characters'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().required('Password is required').min(4, 'Password must be at least 8 characters'),
  });

router.post('/', async (req, res) => {
    try{
      const dataReq = await req.body
        await registrationSchema.validate(dataReq);
        const pass = dataReq.password;
        const salt =  await bcrypt.genSalt(10);
        const hash =  await bcrypt.hash(pass, salt);
        const email = dataReq.email.toUpperCase();
        const useraccount = await user.find({ email: email });
        const username = await user.find({ user_name: dataReq.user_name });
          if (useraccount.length > 0) {
            return res.json({success: false, message: "Email Already Exist" });
          }
        
          if (username.length > 0) {
            return res.json({ success: false, message: "Username Already Exist" });
          }
        
          
            const data = await user.create({
              user_name: dataReq.user_name,
              email: email,
              password: hash,
              suspend: false,
              ban: false,
            });
        
            await data.save();
            return res.json({message:"Account created", success:true})

    }
    catch(error)
    {
      
      console.log(error)
      return res.json({message:"Error", success:false})

    }
})
module.exports = router