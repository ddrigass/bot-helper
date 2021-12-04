/**
 * Telegraf Commands
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *
 * @license: MIT License
 *
 */
import bot from "@app/functions/telegraf";
import * as databases from "@app/functions/databases";
import * as waterClub from "./controllers/waterClub";
import { Markup } from "telegraf";

/**
 * command: /quit
 * =====================
 * If user exit from bot
 *
 */
const quit = async (): Promise<void> => {
	bot.command("quit", (ctx) => {
		ctx.telegram.leaveChat(ctx.message.chat.id);
		ctx.leaveChat();
	});
};

/**
 * command: /photo
 * =====================
 * Send photo from picsum to chat
 *
 */
const sendPhoto = async (): Promise<void> => {
	bot.command("photo", (ctx) => {
		ctx.replyWithPhoto("https://picsum.photos/200/300/");
	});
};

/**
 * command: /callWaterClub
 * =====================
 * Make a call to WaterClub to get water
 *
 */
const callWaterClub = async (): Promise<void> => {
	bot.command("callWaterClub", async (ctx) => {
		ctx.telegram.sendMessage(ctx.message.chat.id, `I start to place an order`);
		const order = await waterClub.makeOrder();
		const message = await ctx.replyWithPhoto({
			source: Buffer.from(String(order.photo), "base64")
		});
		order.photo = message.photo[0].file_id;
		await databases.writeOrder(order);
		ctx.telegram.sendMessage(ctx.message.chat.id, `Order placed`);
	});
};

/**
 * command: /showAllOrders
 * =====================
 * Make a call to WaterClub to get water
 *
 */
const showAllOrders = async (): Promise<void> => {
	bot.command("showAllOrders", async (ctx) => {
		const orders = await databases.getAllOrders();
		const buttons = orders.map(order => Markup.button.callback(`Order №${order.id}`, `Order ${String(order.id)}`));
		return ctx.reply(
			"Orders",
			Markup.inlineKeyboard(buttons)
		);
	});
};

/**
 * command: /start
 * =====================
 * Send welcome message
 *
 */
const start = async (): Promise<void> => {
	bot.start((ctx) => {
		databases.writeUser(ctx.update.message.from);

		ctx.telegram.sendMessage(ctx.message.chat.id, `Welcome! Try send /photo command or write any text`);
	});
};

/**
 * Run bot
 * =====================
 * Send welcome message
 *
 */
const launch = async (): Promise<void> => {
	await bot.launch();
};

export { launch, quit, sendPhoto, start, callWaterClub, showAllOrders };
export default launch;
