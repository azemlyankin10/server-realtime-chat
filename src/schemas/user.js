const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    password: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
});

// Add a pre-save hook to encrypt the password before saving
userSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) return next();

    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

const User = mongoose.model('User', userSchema);
module.exports = User;
