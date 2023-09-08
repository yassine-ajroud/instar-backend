const User = require('../models/User')
const bycrypt = require('bcryptjs')
const jwt  = require ('jsonwebtoken')
const moment = require('moment')
const register = async (req, res, next) => {
    const email = req.body.email;

    try {
        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            return res.json({ message: 'Email already exists' });
        }

        const hashedPass = await bcrypt.hash(req.body.password, 10);

        const user = new User({
            Firstname: req.body.Firstname,
            Lastname: req.body.Lastname,
            email: email,
            phone: req.body.phone,
            password: hashedPass,
            role: req.body.role || 'user'
        });

        await user.save();
        res.json({ message: 'User added successfully' });
    } catch (error) {
        res.json({ message: 'Error occurred' });
    }
};

const login = (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;
    User.findOne({ $or: [{ email: username }, { phone: username }] })
    .then(user => {
        if (user) {
            bycrypt.compare(password, user.password, function(err, result) {
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
                        tokenExpiration: moment(expirationDate).format('DD/MM/YYYY H:mm:ss')
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

  const getAllUsers = async (req, res, next) => {
    try {
      const users = await User.find({}, '-password'); // Exclude the password field
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error occurred while fetching users' });
    }
  };

  const editUser = async (req, res, next) => {
    const { id } = req.params;
    const { newUserData } = req.body;
  
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update user data here
      user.Firstname = newUserData.Firstname;
      user.Lastname = newUserData.Lastname;
      user.email = newUserData.email;
      user.phone = newUserData.phone;
      user.role = newUserData.role;
  
      await user.save();
      res.json({ message: 'User updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error occurred while updating user' });
    }
  };
  const deleteUser = async (req, res, next) => {
    const { id } = req.params;
  
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      await user.remove();
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error occurred while deleting user' });
    }
  };
  
module.exports = {
    register, login,refreshtoken, updateRole,banUser,getAllUsers,editUser,deleteUser
}