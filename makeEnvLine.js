// makeEnvLine.js
import fs from "fs";

try {
  const filePath = "./characteristic-gen-40916-d2e23f17124c.json";
  const jsonString = fs.readFileSync(filePath, "utf8");
  const json = JSON.parse(jsonString);

  // Replace actual newlines in private_key with literal \n
  json.private_key = json.private_key.replace(/\n/g, "\\n");

  const envLine = `GOOGLE_SERVICE_ACCOUNT_KEY=${JSON.stringify(json)}`;

  console.log(envLine);
} catch (error) {
  console.error("Error reading or processing the file:", error);
  process.exit(1);
}
