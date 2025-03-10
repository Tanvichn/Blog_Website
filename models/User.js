const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username : {
        type: String,
        required: true,
        unique: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    creatAt: {
        type: Date,
        default: Date.now,
    },
});

UserSchema.pre('save', function(next){
    if(!this.isModified('password')){
        return next();
    }
    bcrypt.hash(this.password, 10, (err,passwordHash) => {
        if(err){
            return next(err);
        }
        this.password = passwordHash;
        next();
    });
});

// UserSchema.pre('save', async function(next) {
//     if (!this.isModified('password')) {
//         return next();
//     }
//     try {
//         const saltRounds = 10;
//         this.password = await bcrypt.hash(this.password, saltRounds);
//         next();
//     } catch (err) {
//         next(err);
//     }
// });

const User = mongoose.model('User' , UserSchema);
module.exports = User;