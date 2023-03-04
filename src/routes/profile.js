const { Router } = require('express');
const router = Router();
const User = require('../schemas/user');

router.get('/myProfile', async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: 'Something went wrong' });
    }
});

module.exports = router;
