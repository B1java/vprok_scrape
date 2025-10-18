import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
    PROXY_LINK: z.string().optional(),
})

const env = envSchema.parse(process.env)


export default env