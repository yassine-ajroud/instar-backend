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

const login = (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;
    User.findOne({ $or: [{ email: username }, { phone: username }] })
    .then(user => {
        if (user) {
            bcrypt.compare(password, user.password, function(err, result) {
                if (err) {
                    res.json({
                        error: err
                    });
                }
                if (result) {
                    let token = jwt.sign({ name: user.Firstname }, 'secretValue', { expiresIn: '1h' });
                    let refreshtoken = jwt.sign({ name: user.Firstname }, 'refreshtokensecret', { expiresIn: '48h' });

                    // Calculate the expiration date of the token
                    const expirationDate = new Date();
                    expirationDate.setHours(expirationDate.getHours() + 1); 

                    res.json({
                        message: 'login successful',
                        token,
                        refreshtoken,
                        tokenExpiration: expirationDate 
                    });
                } else {
                    res.json({
                        message: 'password does not match!'
                    });
                }
            });

        } else {
            res.json({
                message: 'no user found'
            });
        }
    });
};


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
    register, login,refreshtoken, updateRole,banUser
}