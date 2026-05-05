export const SETTINGS = {
  PORT: process.env.PORT || 3003,
  MONGO_URL: process.env.MONGO_URL || "mongodb://localhost:27017/localhost",
  DB_NAME: process.env.DB_NAME || "uber",
  ADMIN_USERNAME: process.env.ADMIN_USERNAME || "admin",
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || "qwerty",
};
