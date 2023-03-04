const { Router } = require('express');
const router = Router();
const User = require('../schemas/user');

router.get('/search', async (req, res) => {
    const searchParam = req.query.q;
    try {
        const users = await User.find({
            name: { $regex: searchParam, $options: 'i' },
        }).limit(5);
        const usersWithoutMyAccount = users.filter(
            (el) => el._id.toString() !== req.user.id
        );
        return res.json(usersWithoutMyAccount);
    } catch (error) {
        res.status(400).json({ error: 'Something went wrong' });
    }
});

module.exports = router;
