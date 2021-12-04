/**
 * Telegraf Actions
 * =====================
 *
 */
import bot from "@app/functions/telegraf";

/**
 * callback: /quit
 * =====================
 * If user exit from bot
 *
 */
const showOrder = async (): Promise<void> => {
	bot.action(/^Order./, (ctx) => {
		return ctx.reply("this is order");
	});
};

export { showOrder };
