const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    messages: [
        {
            sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            text: { type: String, required: true },
            createdAt: { type: Date, default: Date.now },
        },
    ],
    createdAt: { type: Date, default: Date.now },
});

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;

// Here's an example of how you could use the chat schema and model to create a new chat and add messages to it:

// javascript
// Copy code
// const mongoose = require('mongoose');

// // define the user schema (from the previous example)
// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   profilePicture: { type: String },
//   createdAt: { type: Date, default: Date.now },
// });

// // create the user model from the schema (from the previous example)
// const User = mongoose.model('User', userSchema);

// // define the chat schema
// const chatSchema = new mongoose.Schema({
//   participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
//   messages: [{
//     sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     text: { type: String, required: true },
//     createdAt: { type: Date, default: Date.now },
//   }],
//   createdAt: { type: Date, default: Date.now },
// });

// // create the chat model from the schema
// const Chat = mongoose.model('Chat', chatSchema);

// // create some user documents for testing
// const user1 = new User({
//   username: 'john_doe',
//   email: 'johndoe@example.com',
//   password: 'mysecretpassword',
//   profilePicture: 'https://example.com/profile-picture.jpg',
// });
// const user2 = new User({
//   username: 'jane_doe',
//   email: 'janedoe@example.com',
//   password: 'myothersecretpassword',
//   profilePicture: 'https://example.com/other-profile-picture.jpg',
// });

// // save the user documents to the user collection
// Promise.all([user1.save(), user2.save()])
//   .then(([user1Doc, user2Doc]) => {
//     console.log('users saved:', user1Doc, user2Doc);

//     // create a new chat document with the two users as participants
//     const newChat = new Chat({
//       participants: [user1Doc._id, user2Doc._id],
//     });

//     // save the new chat document to the chat collection
//     return newChat.save();
//   })
//   .then((chatDoc) => {
//     console.log('chat saved:', chatDoc);

//     // add a message to the chat
//     chatDoc.messages.push({
//       sender: user1Doc._id,
//       text: 'Hello, Jane!',
//     });

//     // save the updated chat document to the chat collection
//     return chatDoc.save();
//   })
//   .then((chatDoc) => {
//     console.log('chat updated:', chatDoc);
//   })
//   .catch((err) => {
//     console.error(err);
//   });
// This code creates the user and chat schemas, creates models from the schemas, and then creates some user documents for testing. It then creates a new chat document with the two users as participants, saves the chat document to the chat collection, adds a message to the chat, and saves the updated chat document to the chat collection.

// You can use similar code to interact with your user and chat collections and add more complex functionality to your chat application. You can also use Mongoose's methods to query and update documents in your collections. I recommend reading the Mongoose documentation for more information on how to use Mongoose with Node.js.
