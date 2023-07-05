const Router = require("express").Router();
const bcrypt = require("bcrypt");
const { Users, Files, Comments } = require("./schema");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    if (file.mimetype === "application/pdf") {
      cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
    } else {
      cb(new Error("Invalid file type. Only PDF files are allowed."));
    }
  },
});

const upload = multer({ storage: storage });

Router.get("/heathCheck", (req, res) => {
  res.send("Server is up and running");
});

// Middleware function for API authorization
const authorize = (req, res, next) => {
  // Get the JWT token from the request headers or query parameters
  const token = req.headers.authorization || req.query.token;
  if (!token) {
    // Token not provided
    return res.status(401).json({ error: "Authorization token not found" });
  }

  try {
    // Verify and decode the JWT token
    const decoded = jwt.verify(token, "secret-key");
    // Attach the decoded payload to the request object for further use
    req.user = decoded;
    // Move to the next middleware or route handler
    console.log("authorization success");
    next();
  } catch (error) {
    console.log("authorization error:", error);
    // Token verification failed
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

Router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new Users({ username, email, password: hashedPassword });
    await user.save();

    console.log("/signup - User created successfully");
    res
      .status(201)
      .json({ message: "User created successfully", success: true });
  } catch (error) {
    console.log("/signup - error", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
});

Router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, username: user.username },
      "secret-key",
      {
        expiresIn: "24h",
      }
    );

    console.log("/login - user logged in successfully");

    res.status(200).json({ token, success: true, email });
  } catch (error) {
    console.log("/login -error ", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
});

Router.post(
  "/file/upload",
  authorize,
  upload.single("file"),
  async (req, res) => {
    try {
      if (!req.file) {
        throw new Error("No file provided");
      }

      const payload = {
        name: req?.file?.filename,
        filePath: req?.file?.path,
        user: [
          {
            userId: req?.user?.userId,
            email: req?.user?.email,
            username: req?.user?.username,
            isAdmin: true,
          },
        ],
      };

      const file = new Files(payload);
      await file.save();

      console.log("file uploaded sucessfully");

      // Process the uploaded file

      res.json({
        message: "File uploaded successfully",
        filePath: req.file.path,
      });
    } catch (err) {
      console.log("error", err);
      res.status(400).json({ message: err.message });
    }
  }
);

Router.post("/access", authorize, async (req, res) => {
  const { fileId, email } = req.body;
  const { userId } = req.user;

  try {
    const existingFile = await Files.findOne({ _id: fileId });
    if (existingFile) {
      const isAdminAccessAvailableToLoggedInUser = existingFile.user.some(
        (user) =>
          user.isAdmin && ObjectId.isValid(userId) && user.userId.equals(userId)
      );
      if (!isAdminAccessAvailableToLoggedInUser) {
        return res
          .status(400)
          .json({ message: "You don't have access to share this file" });
      }

      const exisitingUser = await Users.findOne({ email });
      if (!exisitingUser)
        return res.status(400).json({ message: "User does not exist" });

      const isUserPresentAlready = existingFile.user.some((user) =>
        user.userId.equals(exisitingUser._id)
      );

      if (isUserPresentAlready)
        return res
          .status(400)
          .json({ message: "User already has access to this file" });

      let payload = {
        userId: exisitingUser._id,
        email: exisitingUser.email,
        username: exisitingUser.username,
        isAdmin: false,
      };

      existingFile.user.push(payload);
      await existingFile.save();

      return res.status(200).json({ message: "File Shared Successfully" });
    } else {
      return res.status(404).json({ message: "File Not Found" });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err.message });
  }
});

Router.get("/uploads/:filename", authorize, async (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "uploads", filename);
  console.log(" inside");

  const existingFile = await Files.findOne({ name: filename });
  if (!existingFile) res.status(400).json({ message: "File doesn't exitings" });

  const isPermAvailable = existingFile.user.some(
    (user) =>
      ObjectId.isValid(req.user.userId) && user.userId.equals(req.user.userId)
  );

  if (!isPermAvailable)
    res.status(400).json({ message: "You don't have access to this file" });

  // Check if the file exists
  if (fs.existsSync(filePath)) {
    // Send the file as the response
    res.sendFile(filePath);
  } else {
    // File not found, send a 404 response
    res.sendStatus(404);
  }
});

Router.post("/comments", authorize, async (req, res) => {
  const { userId, username } = req.user;
  const { fileId, comment } = req.body;

  try {
    const existingFile = await Files.findOne({ _id: fileId });
    if (!existingFile)
      res.status(400).json({ message: "File doesn't exitings" });

    const isPermAvailable = existingFile.user.some(
      (user) => ObjectId.isValid(userId) && user.userId.equals(userId)
    );

    if (!isPermAvailable)
      res.status(400).json({ message: "You don't have access to this file" });

    let payload = {
      text: comment,
      ownerId: userId,
      username: username,
      fileId: fileId,
    };

    const comments = new Comments(payload);
    await comments.save();
    console.log("comment saved successfully");
    res.status(200).json({ message: "Comment Added successfully" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

module.exports = Router;

Router.get("/listings", authorize, async (req, res) => {
  const { userId } = req.user;

  try {
    const listings = await Files.aggregate([
      {
        $match: { "user.userId": new ObjectId(userId) },
      },
      {
        $lookup: {
          from: "comments", // The name of the comments collection
          localField: "_id",
          foreignField: "fileId",
          as: "comments",
        },
      },
    ]);

    console.log(listings);

    res.status(200).json({ listings });
    console.log({ listings });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
