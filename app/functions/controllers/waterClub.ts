import puppeteer from "puppeteer";
import { OrderInterface } from "@app/types/databases.type";

/*
Flow for make order
1. Load page https://waterclub.od.ua/
2. Click [data-productid="1942"] (button that open modal from some root)
3. type to [name="txtname"] >> Пользователь
4. type to [name="txtphone"] >> 0938888888
5. type to [name="message"] >> Адрес
*/

const makeOrder = async () : Promise<OrderInterface> => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(process.env.WATERCLUB_URL);
	await page.click('[data-productid="1942"]');
	await page.waitForSelector("#formOrderOneClick");
	await page.type(`#formOrderOneClick [name="txtname"]`, process.env.NAME);
	await page.focus('#formOrderOneClick [name="txtphone');
	await page.waitForTimeout(1000);
	await page.keyboard.type(process.env.NUMBER);
	await page.type(`#formOrderOneClick [name="message"]`, process.env.COMMENT);
	// await page.click(`#formOrderOneClick [type="submit"]`);
	const photo = String(await page.screenshot({ encoding: "base64" }));
	await browser.close();
	return {
		photo,
		date: new Date()
	};
};

export { makeOrder };
