import { config } from "dotenv";

export function configDotEnv() {
    process.stdout.write("Config dotenv...");
    config();
    process.stdout.write("finished\n")
}