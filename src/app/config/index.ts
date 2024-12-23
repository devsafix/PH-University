import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  port: process.env.PORT,
  database_url: process.env.DB_URL,
  salt_round: process.env.SALT_ROUND,
  default_pass: process.env.DEFAULT_PASS,
  node_env: process.env.NODE_ENV,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  reset_pass_ui_Link:process.env.RESET_PASSWORD_UI_LINK
  
};
