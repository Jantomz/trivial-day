const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = 8080;

const mongo_uri = process.env.MONGO_URI;

app.use(cors({ origin: "*" }));
app.use(express.json()); // Middleware to parse JSON bodies

// Define Mongoose schema and model
const leaderboardSchema = new mongoose.Schema({
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const userSchema = new mongoose.Schema({
  name: String,
  score: Number,
  choices: [String],
  time: Number,
});

const Leaderboard = mongoose.model("Leaderboard", leaderboardSchema);
const User = mongoose.model("User", userSchema);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/questions", (req, res) => {
  res.json([
    {
      question: "What is the full name of the Talk Tuah Podcast host?",
      answers: [
        "Sarah Wiley",
        "Hannah Brown",
        "Talia Saunders",
        "Haliey Welch",
      ],
      correctAnswer: "Haliey Welch",
    },
    {
      question:
        "Which country flies a green, white, and orange (in that order) tricolor flag?",
      answers: ["Ivory Coast", "Italy", "Ireland", "India"],
      correctAnswer: "Ireland",
    },
    {
      question: "What is widely referred to as 'The Game'?",
      answers: ["The Superbowl", "Harvard v. Yale", "Squidgame", "TicTacToe"],
      correctAnswer: "Harvard v. Yale",
    },
    {
      question: "What is not brainrot?",
      answers: ["Skibidi Toilet", "Pink Tortillas", "Fanum Tax", "Rizzler"],
      correctAnswer: "Pink Tortillas",
    },
    {
      question: "How many states are in the USA?",
      answers: ["51", "52", "49", "50"],
      correctAnswer: "50",
    },
    {
      question: "Which horoscope sign is a fish?",
      answers: ["Pisces", "Big Dipper", "Taurus", "Virgo"],
      correctAnswer: "Pisces",
    },
    {
      question: "Which app has the most total users?",
      answers: ["TikTok", "Twitter", "Facebook", "Instagram"],
      correctAnswer: "Instagram",
    },
  ]);
});

app.get("/api/user/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      user,
      message: "User retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving user",
      error: error.message,
    });
  }
});

app.get("/api/leaderboard/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const leaderboard = await Leaderboard.findById(id).populate("users");
    if (!leaderboard) {
      return res.status(404).json({
        success: false,
        message: "Leaderboard not found",
      });
    }

    res.json({
      success: true,
      leaderboard,
      message: "Leaderboard retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving leaderboard",
      error: error.message,
    });
  }
});

app.post("/api/user", async (req, res) => {
  const { name, score, choices, time, leaderboardId } = req.body;

  let leaderboard;

  try {
    const newUser = new User({ name, score, choices, time });
    await newUser.save();

    if (!mongoose.Types.ObjectId.isValid(leaderboardId)) {
      leaderboard = await new Leaderboard({ users: [newUser._id] }).save();
      return res.json({
        success: true,
        leaderboard,
        user: newUser,
        message: "User saved successfully and new leaderboard created",
      });
    }

    const ObjectId = mongoose.Types.ObjectId;
    const leaderboardObjectId = new ObjectId(leaderboardId);
    leaderboard = await Leaderboard.findOne({ _id: leaderboardObjectId });
    if (!leaderboard) {
      leaderboard = new Leaderboard({ users: [newUser._id] });
    } else {
      leaderboard.users.push(newUser._id);
    }
    await leaderboard.save();

    res.json({
      success: true,
      leaderboard,
      user: newUser,
      message: "User saved successfully and added to leaderboard",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error saving user",
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

(async () => {
  try {
    await mongoose.connect(mongo_uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB", err);
  }
})();
