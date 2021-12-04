import * as command from "@app/functions/commands";
import * as hears from "@app/functions/hears";
import * as actions from "@app/functions/actions";
import dotenv from "dotenv";
import path from "path";

/**
 * Start bot
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *
 * @license: MIT License
 *
 */
(async () => {
	dotenv.config({ path: path.join(__dirname, "../../.env") });

	await command.quit();
	await command.start();
	await command.sendPhoto();
	await command.callWaterClub();
	await command.showAllOrders();
	await actions.showOrder();
	await hears.text();
	await command.launch();
})();
