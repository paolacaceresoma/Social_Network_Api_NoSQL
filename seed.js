const { Thought } = require("./models");
// needed to connect the seed to the database
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/socialNetworkDB");
// adding reacions to thoughts

async function addReactions() {
  // get all thoughts in the database save it ina variable
  const allThoughts = await Thought.find();

  // iterate or for loop through all those thoughts and check if each thought has a reaction
  for (let item = 0; item < allThoughts.length; item++) {
    // if the reaction array is empty for that thought, add 3 hard coded reactions to it
    if (allThoughts[item].reactions.length === 0) {
      let oneThought = allThoughts[item];
      oneThought.reactions.push(
        { reactionBody: "I like it!", username: "Ross" },
        { reactionBody: "This helped me in hard moments", username: "Joey" },
        { reactionBody: "Cannot agree more!", username: "Rachel" }
      );
      await oneThought.save();
    }
  }
  console.log("done");
}

addReactions();
