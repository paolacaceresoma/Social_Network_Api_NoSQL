const { User } = require("../models");
const userRouter = require("express").Router();

// get all users
userRouter.get("/", async (req, res) => {
  try {
    const result = await User.find({});
    console.log(result);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get user by id
userRouter.get("/:id", async (req, res) => {
  try {
    const result = await User.findOne({ _id: req.params.id });
    console.log(result);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// create a user
userRouter.post("/post-user", async (req, res) => {
  try {
    const { username, email } = req.body;
    const newUser = new User({ username, email });

    const savedUser = await newUser.save();
    if (savedUser) {
      res.status(200).json(savedUser);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// delete a user
userRouter.delete("/find-one-delete/:username", async (req, res) => {
  try {
    const result = await User.findOneAndDelete({
      username: req.params.username,
    });
    console.log(`Deleted: ${result}`);
    res.status(200).json(result);
  } catch (err) {
    console.log("Uh Oh, something went wrong");
    res.status(500).json({ error: "Something went wrong" });
  }
});

// update a user
userRouter.put("/update-user/:id", async (req, res) => {
  try {
    const _id = req.params.id; // Extract the document ID from the request parameters
    const { username, email } = req.body; // Extract the updated data from the request body

    // Find the user document by ID and update its username and email fields
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { username, email },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser); // Respond with the updated user document
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// add friend
userRouter.put("/:userId/add-friend/:friendId", async (req, res) => {
  try {
    const { userId, friendId } = req.params; // Extract the user and friend IDs from the request parameters

    // Find the user document by ID and push the friendId to the friends array
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { friends: friendId } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.json(updatedUser); // Respond with the updated user document
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete friend
userRouter.delete("/:userId/del-friend/:friendId", async (req, res) => {
  try {
    const { userId, friendId } = req.params;

    const dbFriend = await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { friends: friendId } },
      { new: true }
    );

    if (!dbFriend) {
      return res.status(404).json({ message: "User not found!" });
    }
    res.json(dbFriend);
  } catch (err) {
    console.log("Uh oh! Something went wrong");
    res.status(500).json(err);
  }
});

module.exports = userRouter;
