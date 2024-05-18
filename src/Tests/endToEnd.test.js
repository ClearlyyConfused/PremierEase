const { By, Builder, Browser } = require('selenium-webdriver');
let driver;

beforeAll(async () => {
	// setup the driver
	driver = await new Builder().forBrowser(Browser.CHROME).build();
	await driver.get('http://localhost:3000/');
	await driver.manage().window().setRect({ width: 1280, height: 550 });
	await driver.manage().setTimeouts({ implicit: 10000 });
});

afterAll(async () => {
	await driver.quit();
});

test('Correct site is loaded', async () => {
	let title = await driver.getTitle();
	expect(title).toBe('Premier Ease');
});

test("Clicking on 'Fixtures' brings you to fixtures page", async () => {
	await driver.findElement(By.xpath("//a/button[text()='Fixtures']")).click();
	let h1 = await driver.findElement(By.xpath('//h1')).getText();
	expect(h1).toBe('FIXTURES');
});

test("Clicking on 'Results' brings you to results page", async () => {
	await driver.findElement(By.xpath("//a/button[text()='Results']")).click();
	let h1 = await driver.findElement(By.xpath('//h1')).getText();
	expect(h1).toBe('RESULTS');
});

test("Clicking on 'Table' brings you to table page", async () => {
	await driver.findElement(By.xpath("//a/button[text()='Table']")).click();
	let h1 = await driver.findElement(By.xpath('//h1')).getText();
	expect(h1).toBe('TABLE');
});
