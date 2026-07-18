const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

// ================= CONFIG =================

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;

const allowedOrigins = [
  "http://localhost:5173",
  "https://jam-together.vercel.app",
  "https://jam-together-2tcx.onrender.com",
  "https://parassoni0.github.io/music",
  "http://eshwarkrishna.me",
  "https://eshwarkrishna.me"
];

// ================= CORS =================

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS Not Allowed"));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());

const io = new Server(server, {
  cors: corsOptions
});

// ================= DATABASE =================

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// ================= SCHEMAS =================

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const favoriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  trackId: {
    type: String,
    required: true,
  },
  trackData: {
    type: Object,
    required: true,
  },
});

favoriteSchema.index(
  {
    userId: 1,
    trackId: 1,
  },
  {
    unique: true,
  }
);

const User = mongoose.model("User", userSchema);
const Favorite = mongoose.model("Favorite", favoriteSchema);

// ================= HEALTH =================

app.get("/", (req, res) => {
  res.send("Music App Backend is running!");
});

// ================= AUTH =================

app.post("/api/auth/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json({
        message: "Username and Password required",
      });

    const existingUser = await User.findOne({ username });

    if (existingUser)
      return res.status(409).json({
        message: "Username already exists",
      });

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      username,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({
      message: "Signup Successful",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Signup Failed",
    });
  }
});

app.post("/api/auth/signin", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user)
      return res.status(404).json({
        message: "User not found",
      });

    const isCorrect = await bcrypt.compare(password, user.password);

    if (!isCorrect)
      return res.status(400).json({
        message: "Invalid Credentials",
      });

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    res.status(200).json({
      result: {
        id: user._id,
        username: user.username,
      },
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Signin Failed",
    });
  }
});

// ================= AUTH MIDDLEWARE =================

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token)
      return res.status(401).json({
        message: "No Token",
      });

    const decoded = jwt.verify(token, JWT_SECRET);

    req.userId = decoded.id;

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid Token",
    });
  }
};

// ================= FAVORITES =================

app.get("/api/favorites", auth, async (req, res) => {
  try {
    const favorites = await Favorite.find({
      userId: req.userId,
    });

    res.json(favorites.map((fav) => fav.trackData));
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error Fetching Favorites",
    });
  }
});

app.post("/api/favorites", auth, async (req, res) => {
  try {
    const { track } = req.body;

    const favorite = new Favorite({
      userId: req.userId,
      trackId: track.trackId,
      trackData: track,
    });

    await favorite.save();

    res.status(201).json(track);
  } catch (err) {
    if (err.code === 11000)
      return res.status(409).json({
        message: "Already Added",
      });

    console.log(err);

    res.status(500).json({
      message: "Error",
    });
  }
});

app.delete("/api/favorites/:trackId", auth, async (req, res) => {
  try {
    await Favorite.deleteOne({
      userId: req.userId,
      trackId: req.params.trackId,
    });

    res.json({
      message: "Removed",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Error",
    });
  }
});

// ================= SOCKET.IO =================

io.on("connection", (socket) => {
  console.log("Connected:", socket.id);

  socket.on("join_session", (sessionId) => {
    socket.join(sessionId);

    socket.to(sessionId).emit("user_joined", {
      text: "A user joined",
    });
  });

  socket.on("playback_control", (data) => {
    socket.to(data.sessionId).emit("update_playback", data);
  });

  socket.on("chat_message", (data) => {
    io.to(data.sessionId).emit("new_message", data);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected:", socket.id);
  });
});

// ================= START =================

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on ${PORT}`);
});