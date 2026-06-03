import fs from "fs";
import path from "path";

// Simulating what handler does
function testLoad() {
  try {
    const envPath = path.join(process.cwd(), "env");
    console.log("Checking path:", envPath);
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, "utf8");
      envContent.split("\n").forEach((line) => {
        const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
        if (match) {
          const key = match[1];
          let value = match[2] || "";
          if (value.startsWith('"') && value.endsWith('"')) {
            value = value.substring(1, value.length - 1);
          } else if (value.startsWith("'") && value.endsWith("'")) {
            value = value.substring(1, value.length - 1);
          }
          process.env[key] = value;
          console.log(`Loaded ${key}=${value}`);
        }
      });
    } else {
      console.log("Env path does not exist");
    }
  } catch (err) {
    console.warn("Failed to load local env file:", err);
  }
}

testLoad();
console.log("RESEND_API_KEY:", process.env.RESEND_API_KEY);
