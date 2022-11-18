/**
 * This script can be used to update an environment variable in the given environment file (e.g., .env)
 */
import * as fs from "node:fs";
import * as path from "node:path";
import * as dotenv from "dotenv";

export const readEnv = (envPath: string, varToRead: string) => {
  const envPathResolved = path.resolve(envPath);
  const envContent = fs.readFileSync(envPathResolved).toString();
  const env = dotenv.parse(envContent);

  return env[varToRead];
};
