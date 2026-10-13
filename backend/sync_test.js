import { connectDB, sequelize } from './config/db.js';
import User from './models/User.js';
import Skill from './models/Skill.js';
import Request from './models/Request.js';

const run = async () => {
  await connectDB();
  try {
    await sequelize.sync({ alter: true });
    console.log("Sync complete!");
    
    // Check tables
    const tables = await sequelize.getQueryInterface().showAllSchemas();
    console.log("Tables:", tables);
  } catch (err) {
    console.error("Sync error:", err);
  }
  process.exit();
};

run();
