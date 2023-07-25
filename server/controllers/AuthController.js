const User = require('../models/User')
const bycrypt = require('bcryptjs')
const jwt  = require ('jsonwebtoken')

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
            password: hashedPass
    
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
                    let token = jwt.sign({name : user.Firstname},'secretValue',{expiresIn:'30s'})
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
module.exports = {
    register, login
}