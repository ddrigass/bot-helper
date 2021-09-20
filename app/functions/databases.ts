/**
 * Database: lowdb
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *
 * @license: MIT License
 *
 */
import lowdb from "lowdb";
import lowdbFileSync from "lowdb/adapters/FileSync";
import configs from "@configs/config";

import type { OrderInterface, TelegramUserInterface } from "@app/types/databases.type";

const databases = { users: null, orders: null };

databases.users = lowdb(new lowdbFileSync(configs.databases.users));
databases.users.defaults({ users: [] }).write();

databases.orders = lowdb(new lowdbFileSync(configs.databases.orders));
databases.orders.defaults({ orders: [] }).write();

/**
 * writeUser()
 * =====================
 * Write user information from telegram context to user database
 *
 * @Context: ctx.update.message.from
 *
 * @interface [TelegramUserInterface](https://github.com/ptkdev-boilerplate/node-telegram-bot-boilerplate/blob/main/app/webcomponent/types/databases.type.ts)
 *
 * @param { TelegramUserInterface } json - telegram user object
 *
 */
const writeUser = async (json: TelegramUserInterface): Promise<void> => {

	const user_id = databases.users.get("users").find({ id: json.id }).value();

	if (user_id) {
		databases.users.get("users").find({ id: user_id.id }).assign(json).write();
	} else {
		databases.users.get("users").push(json).write();
	}

};

/**
 * writeUser()
 * =====================
 * Write user information from telegram context to user database
 *
 * @Context: ctx.update.message.from
 *
 * @interface [TelegramUserInterface](https://github.com/ptkdev-boilerplate/node-telegram-bot-boilerplate/blob/main/app/webcomponent/types/databases.type.ts)
 *
 * @param { TelegramUserInterface } json - telegram user object
 *
 */
const writeOrder = async (json: OrderInterface): Promise<void> => {
	let order_id = databases.orders.get("orders").takeRight(1).value()[0]?.id;

	json.id = Number.isInteger(order_id) ? ++order_id : 0;

	databases.orders.get("orders").push(json).write();

	// if (user_id) {
	// 	databases.orders.get("orders").find({ id: user_id.id }).assign(json).write();
	// } else {
	// 	databases.orders.get("orders").push(json).write();
	// }

};

export { databases, writeUser, writeOrder };
export default databases;
