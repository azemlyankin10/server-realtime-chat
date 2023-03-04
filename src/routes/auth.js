const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../schemas/user');
const { Router } = require('express');

const router = Router();

router.post('/register', async (req, res) => {
    const { password, name } = req.body;
    if (!password || !name) {
        return res
            .status(404)
            .json({ error: 'There id no password or userName params' });
    }

    try {
        const user = await User.findOne({ name });
        if (user) {
            console.log(user);
            return res.status(401).json('The name already exist');
        }

        const newUser = new User({ password, name });
        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, 'secret');
        res.status(200).json({ token, user: newUser });
    } catch (error) {
        res.status(400).json({ error: 'Something went wrong' });
    }
});

router.post('/login', async (req, res) => {
    const { name, password } = req.body;
    try {
        const user = await User.findOne({ name });
        if (!user) {
            return res.status(401).json('Invalid name or password');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json('Invalid name or password');
        }

        const token = jwt.sign({ id: user._id }, 'secret');
        res.status(200).json({ token, user });
    } catch (error) {
        res.status(400).json({ error: 'Something went wrong' });
    }
});

module.exports = router;
