import dotenv from 'dotenv';
dotenv.config();

import { Bot } from 'gramio';

const token: string = process.env.TELEGRAM_BOT_TOKEN || '';

const bot = new Bot(token);

bot.on("pre_checkout_query", async (ctx) => {
    const queryId = ctx.update?.pre_checkout_query?.id;
    ctx.answerPreCheckoutQuery({
        pre_checkout_query_id: queryId,
        ok: true
    });
});

bot.on("successful_payment", async (ctx) => {
    // TODO : register invoice in database
});

bot.start();
export { bot };