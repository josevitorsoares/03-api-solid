import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
    NODE_ENV: z.enum(["dev", "test", "prod"]).default("dev"),
    PORT: z.coerce.number().default(3333), //O .coerce realiza um cast no valor
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
    console.error("❌ Invalid Environment Variables", _env.error.format());

    throw new Error("Invalid Environment Variables");
}

export const env = _env.data;