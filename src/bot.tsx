import dotenv from 'dotenv';
dotenv.config();

import { Bot } from 'gramio';

const token: string = process.env.TELEGRAM_BOT_TOKEN || '';

const bot = new Bot(token);

bot.start();
export { bot };