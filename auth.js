const fs = require("fs");
const readline = require("readline");
const crypto = require("crypto");
const path = require("path");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const DATA_FILE = path.join(__dirname, "authusers.json");

// Utility to hash passwords
function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

// Read user data
function readUsers() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, "[]");
  }
  const data = fs.readFileSync(DATA_FILE);
  return JSON.parse(data);
}

// Write user data
function writeUsers(users) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
}

// Signup function
function signup() {
  rl.question("Enter username: ", (username) => {
    rl.question("Enter password: ", (password) => {
      const users = readUsers();
      const existingUser = users.find(u => u.username === username);

      if (existingUser) {
        console.log("❌ Username already exists.");
        rl.close();
        return;
      }

      const hashedPassword = hashPassword(password);
      users.push({ username, password: hashedPassword });
      writeUsers(users);
      console.log("✅ Signup successful.");
      rl.close();
    });
  });
}

// Login function
function login() {
  rl.question("Enter username: ", (username) => {
    rl.question("Enter password: ", (password) => {
      const users = readUsers();
      const hashedPassword = hashPassword(password);
      const user = users.find(u => u.username === username && u.password === hashedPassword);

      if (user) {
        console.log("✅ Login successful.");
      } else {
        console.log("❌ Invalid username or password.");
      }
      rl.close();
    });
  });
}

// Choose operation
rl.question("Choose an option (signup / login): ", (option) => {
  if (option === "signup") {
    signup();
  } else if (option === "login") {
    login();
  } else {
    console.log("❌ Invalid option.");
    rl.close();
  }
});
