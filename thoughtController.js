const { Thought } = require("../models");
const thoughtRouter = require("express").Router();

// get all thoughts
thoughtRouter.get("/", async (req, res) => {
  try {
    const result = await Thought.find({});
    console.log(result);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//get thought by id
thoughtRouter.get("/:id", async (req, res) => {
  try {
    const result = await Thought.findOne({ _id: req.params.id });
    console.log(result);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//create a thought
thoughtRouter.post("/post-thought", async (req, res) => {
  try {
    const { thoughtText, username, reactions } = req.body;
    const newThought = new Thought({ thoughtText, username, reactions });
    const savedThought = await newThought.save();
    if (savedThought) {
      console.log(savedThought);
      res.status(200).json(savedThought);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// delete a thought
thoughtRouter.delete("/delete/:id", async (req, res) => {
  try {
    const result = await Thought.findByIdAndDelete(req.params.id);
    console.log(`Deleted: ${result}`);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// update a thought
thoughtRouter.put("/update-thought/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const { thoughtText, username, reactions } = req.body;
    const updatedThought = await Thought.findByIdAndUpdate(
      _id,
      { thoughtText, username, reactions },
      { new: true }
    );
    if (!updatedThought) {
      return res.status(404).json({ message: "Thought not found!" });
    }
    res.status(200).json(updatedThought);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// add a reacion
thoughtRouter.put("/add-reaction/:id", async (req, res) => {
  try {
    const { reactionBody, username } = req.body;

    const newReaction = await Thought.findByIdAndUpdate(
      { _id: req.params.id },
      { $push: { reactions: { reactionBody, username } } },
      { new: true }
    );
    if (!newReaction) {
      return res.status(404).json({ message: "Thought not found!" });
    }
    console.log(newReaction);
    res.status(200).json(newReaction);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// delete a reaction
thoughtRouter.delete(
  "/:thoughtId/del-reaction/:reactionId",
  async (req, res) => {
    try {
      const { thoughtId, reactionId } = req.params;
      const result = await Thought.findOneAndUpdate(
        { _id: thoughtId },
        { $pull: { reactions: { _id: reactionId } } },
        { new: true }
      );
      if (!result) {
        return res.status(404).json({ message: "Thought not found!" });
      }
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
);

//Export Module
module.exports = thoughtRouter;
