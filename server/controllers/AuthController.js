const User = require('../models/User')
const bycrypt = require('bcryptjs')
const jwt  = require ('jsonwebtoken')
const nodemailer=require("nodemailer");
const register = (req,res,next)=>{
    bycrypt.hash(req.body.password,10,function(err,hashedPass){
        if(err){
            res.json({
                error :err
            })
        }
        let user = new User ({
            Firstname : req.body.Firstname,
            Lastname : req.body.Lastname,
            email : req.body.email,
            phone : req.body.phone,
            password: hashedPass,
            role: req.body.role || 'user'
    
        })
        user.save().then(user => {
            res.json ({
                message :"user Added Successfully"
            })
        })
        .catch (error =>{
            res.json({
                message : " error occured"
            })
        })
    })
  
}

const login = (req,res,next)=>{
    var username = req.body.username
    var password = req.body.password
    User.findOne({$or:[{email:username},{phone:username}]})
    .then(user=>{
        if(user){
            bycrypt.compare(password,user.password,function(err,result){
                if(err){
                    res.json({
                        error : err
                    })
                }
                if(result){
                    let token = jwt.sign({name : user.Firstname},'secretValue',{expiresIn:'1h'})
                    let refreshtoken = jwt.sign({name : user.Firstname},'refreshtokensecret',{expiresIn:'48h'})

                    res.json({
                        message : 'login suuccessful',
                        token,
                        refreshtoken
                    })
                }else{
                    res.json({
                        message : 'password does not matched !'
                    })
                }
            })

        }else{
            res.json({
                message : 'no user found'
            })
        }
    })
}


const forgetPassword = (req,res,next)=>{
    var username = req.body.username
    var password = req.body.password
    var emaill = req.body.email

    var  random=Math.floor(Math.random() * 10000);

    
    User.findOne({$or:[{email:emaill}]})
    .then(async user=>{
        if(user){
           
             
            user.code=random;
            const code = await User.findByIdAndUpdate(
                user.id, { 
                code: user.code }, { new: true });

            let details={
                from:"ayed.boukadida@esprit.tn",
                to:emaill,
                subject:"Please reset your password",
                text:`We heard that you lost your application password.\n Sorry about that! But don’t worry!\n You can use the following CODE to reset your password : \n  ${random}`
            
            };
            let mailTransporter=nodemailer.createTransport({
                service:"gmail",auth:{user:"ayed.boukadida@esprit.tn",pass:"211JMT3065",}
            }); 
                       mailTransporter.sendMail(details,(err)=>{ if(err){ 
                           
                           console.log("it has an error",err) ;
                       
                       } else{ console.log("email has sent!") 
                       
                       
                       
                       }
                        })
                    res.json({
                        message : `send email  suuccessful `,
                        
                    })
          
          

        }else{
            res.json({
                message : 'no email found'
            })
        }
    })
}
const VerifCode = (req,res,next)=>{
    var username = req.body.username
    var password = req.body.password
    var codee =req.body.code
    var emaill = req.body.email
    User.findOne({$or:[{code:codee}]})
    .then(user=>{
        if(user){

       


                        res.json({
                        message : `code suuccessful`,
                     
                    })
         
         

        }else{
            return  res.json({
                message : 'no code  found '
            })
        }
    })
}



const Resetpassword = (req,res,next)=>{
    var username = req.body.username
    var passwordd = req.body.password
    var codee =req.body.code
    var emaill = req.body.email
    User.findOne({$or:[{email:emaill}]})
    .then(async user=>{
        if(user){

       
            const password = await User.findByIdAndUpdate(
                user.id, { 
                password: passwordd }, { new: true });

                        res.json({
                        message : `password updated suuccessful`,
                     
                    })
         
         

        }else{
            return  res.json({
                message : 'no password  found '
            })
        }
    })
}

const refreshtoken = (req,res,next)=>{
    const refreshtoken = req.body.refreshtoken
    jwt.verify(refreshtoken,'refreshtokensecret',function(err,decode){
        if(err){
            res.status(400).json({
                err
            })
        } else{
            let token = jwt.sign ({name : decode.Firstname},'refreshtokensecret' , {expiresIn : '60s'})
            let refreshtoken = req.body.refreshtoken
            res.status(200).json({
                message : "Token refreshed "
            })
        }
    })
}

const updateRole = async (req, res, next) => {
    const { id } = req.params;
    const { newRole } = req.body;
  
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      if (user.role !== 'admin') {
        return res.status(403).json({ message: 'Authorization needed' });
      }
  
      user.role = newRole;
      await user.save();
      res.json({ message: 'updated ' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  const banUser = async (req, res, next) => {
    const { id } = req.params;
    const { banned } = req.body;
  
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      if (user.role !== 'admin') {
        return res.status(403).json({ message: 'Authorization needed' });
      }
  
      user.ban = banned;
      await user.save();
      res.json({ message: `user ${banned ? 'banned' : 'débanni'} ` });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
module.exports = {
    register, login,forgetPassword,Resetpassword,VerifCode,refreshtoken, updateRole,banUser
}