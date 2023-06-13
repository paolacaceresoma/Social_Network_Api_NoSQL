const { Schema, model, Types } = require("mongoose");

const formatDate = require("../utils/dateFormat"); // to show date in standard format
// const { Thought } = require(".");
function getFormattedDate(date) {
  return formatDate(date);
}

const ReactionsSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => {
        new Types.ObjectId();
      },
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    username: {
      type: String,
      id: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAt) => getFormattedDate(createdAt),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const ThoughtSchema = new Schema(
  {
    thoughtText: { type: String, required: true, minLength: 1, maxLength: 280 },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAt) => getFormattedDate(createdAt),
    },
    username: {
      type: String,
      id: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reactions: [ReactionsSchema],
  },
  {
    toJSON: { getters: true },
  }
);

// sets Thoughts model
const Thought = model("Thoughts", ThoughtSchema);

// export module
module.exports = Thought;
