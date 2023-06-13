const { Schema, model, Types } = require("mongoose");
const mongoose = require("mongoose");

const UserSchema = new Schema(
  {
    username: { type: String, unique: true, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email.`,
      },
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// Schema Settings:Create a virtual called friendCount that retrieves the length of the user's friends array field on query
UserSchema.virtual("friendCount").get(function () {
  return this.friends.length; //this ==> UserSchema
});

// sets User model
const User = model("User", UserSchema);

// Will add data only if collection is empty to prevent duplicates
User.find({})
  .exec()
  .then(async (collection) => {
    if (collection.length === 0) {
      try {
        const insertedUsernames = await User.insertMany([
          { username: "Parisa", email: "parisa@gmail.com" },
          { username: "Mehdi", email: "mehdi@gmail.com" },
          { username: "Jack", email: "jack@gmail.com" },
          { username: "Tom", email: "tom@gmail.com" },
          { username: "Mary", email: "mary@gmail.com" },
          { username: "Sarah", email: "sarah@gmail.com" },
          { username: "Missy", email: "missy@gmail.com" },
          { username: "George", email: "george@gmail.com" },
          { username: "Sheldon", email: "sheldon@gmail.com" },
          { username: "Penny", email: "penny@gmail.com" },
          { username: "Aimy", email: "aimy@gmail.com" },
          { username: "Monica", email: "monica@gmail.com" },
        ]);
        console.log("Inserted items :", insertedUsernames);
      } catch (err) {
        console.log(err);
      }
    }
  });

// export module
module.exports = User;
