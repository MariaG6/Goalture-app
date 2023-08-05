const { Schema, model } = require("mongoose");

const stepSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

// The goalSchema with a defined property user that will be connected to MongoDB to provide unique ObjectID
//and the steps with a validation of at least 3 steps.
//To do:  Create an enum with different categories as part of the Goal Schema

const goalSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    steps: {
      type: [stepSchema],
      required: true,
      validate: {
        validator: function (value) {
          return value.length === 3;
        },
        message: "Goal must contain at least 3 steps",
      },
    },
    category: {
      type: String,
      enum: [
        "Health",
        "Sports",
        "Personal Life",
        "Education",
        "Career",
        "Family",
        "Financial goals",
        "Lifestyle",
        "Stop bad habits",
      ],
      required: true,
    },
    reason: {
      type: String,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    isPrivate: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Goal = model("Goal", goalSchema);

module.exports = Goal;
