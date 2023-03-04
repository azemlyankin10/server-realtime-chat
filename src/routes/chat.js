const { Router } = require('express');
const router = Router();
const Chat = require('../schemas/chat');
const User = require('../schemas/user');

router.post('/create', async (req, res) => {
    const user1 = req.user.id;
    const user2 = req.body.userId;
    try {
        const chatFromDb = await Chat.findOne({ participants: [user1, user2] });
        if (chatFromDb) {
            res.status(200).json(chatFromDb);
            return;
        }

        const newChat = new Chat({
            participants: [user1, user2],
        });

        const participants = [];

        //find users data and put it in participants array
        for (const el of newChat.participants) {
            const user = await User.findById(el);
            participants.push(user);
        }

        const chat = await newChat.save();

        res.status(200).json({ ...chat, participants });
    } catch (error) {
        res.status(400).json({ error: 'Something went wrong' });
    }
});

router.get('/all', async (req, res) => {
    const user = req.user.id;
    try {
        //get all user's chats
        const chats = await Chat.find({ participants: user });
        const chatsWithTrueUsersAndLastMessage = [];

        // take all chat from user's chats
        for (const chat of chats) {
            const participants = [];

            //find users data and put it in participants array
            for (const el of chat.participants) {
                const user = await User.findById(el);
                participants.push(user);
            }

            //take only last message
            const chatWithShortMessages = {
                ...chat,
                _doc: {
                    ...chat._doc,
                    messages: [chat.messages[chat.messages.length - 1]],
                },
            };

            //put it in array
            chatsWithTrueUsersAndLastMessage.push({
                ...chatWithShortMessages,
                participants,
            });
        }

        //sent to client
        res.status(200).json(chatsWithTrueUsersAndLastMessage);
    } catch (error) {
        res.status(400).json({ error: 'Something went wrong' });
    }
});

router.get('/:id', async (req, res) => {
    const roomId = req.params.id;
    if (!roomId)
        return res.status(404).json({ error: 'Not found! There is no roomId' });
    try {
        const chat = await Chat.findById(roomId);
        if (chat) {
            res.status(200).json(chat);
        }
    } catch (error) {
        res.status(400).json({ error: 'Something went wrong' });
    }
});

module.exports = router;
