import { CorsOptions } from "cors";
import { env } from "../../env";

export const corsOptions: CorsOptions = {
  origin: [env.CLIENT_URL, "https://localhost:5173"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
};
