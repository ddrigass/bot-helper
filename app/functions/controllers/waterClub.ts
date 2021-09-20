import puppeteer from "puppeteer";

/*
Flow for get order
1. Load page https://waterclub.od.ua/
2. Click [data-productid="1942"] (button that open modal from some root)
3. type to [name="txtname"] >> Пользователь
4. type to [name="txtphone"] >> 0938888888
5. type to [name="message"] >> Адрес
*/

const makeOrder = async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto("https://waterclub.od.ua/");
	await page.click('[data-productid="1942"]');
	await page.waitForSelector("#formOrderOneClick");
	await page.type(`#formOrderOneClick [name="txtname"]`, "Пользователь");
	await page.type(`#formOrderOneClick [name="txtphone"]`, "0938888888");
	await page.type(`#formOrderOneClick [name="message"]`, "Адрес");
	// await page.click(`#formOrderOneClick [type="submit"]`);
	const photo = await page.screenshot({ encoding: "base64" });
	await browser.close();
	return {
		photo,
		date: new Date()
	};
};

export { makeOrder };
