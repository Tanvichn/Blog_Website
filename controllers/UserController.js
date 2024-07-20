const bcrypt = require('bcrypt');
const User = require('../models/User');

const createUser = (req,res) => {
    res.render('create-user');
};

// const storeUser = async (req, res) => {
//     User.create(req.body , (error,user) => {
//         res.redirect('/');
//     });
// };

const storeUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.redirect('/');
    } catch (error) {
        // Handle the error as needed, for example by sending an error response
        res.status(500).send('Error storing user');
    }
};

const showLoginPage = async (req, res) => {
    res.render('login');
}

const loginUser = async (req, res) => {
    try{
    const{email, password} = req.body;
    const user = await User.findOne({email});
    if(user){
        const result = await bcrypt.compare(password, user.password);
        if(result) {
            req.session.userId = user._id;
            res.redirect('/');
        }
         else 
        {
            console.log('Incorrect Email/Password');
            res.redirect('/auth/login');
        }
    } 
    else {
            console.log('Incorrect Email/Password');
            res.redirect('/auth/login'); }
    }
    catch (error){
        alert(error);
    }
};

const logoutUser = (req , res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
};

module.exports = {
    createUser,
    storeUser,
    showLoginPage,
    loginUser,
    logoutUser,
};
