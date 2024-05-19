const { By, Builder, Browser, until } = require('selenium-webdriver');

describe('Test general navigation of the site using the nav bar', () => {
	let driver;
	beforeAll(async () => {
		driver = await new Builder().forBrowser(Browser.CHROME).build();
		await driver.get('http://localhost:3000/');
		await driver.manage().window().maximize();
	});
	afterAll(async () => {
		await driver.quit();
	});

	test("Clicking on 'Fixtures' brings you to fixtures page", async () => {
		await driver
			.wait(until.elementLocated(By.xpath("//a/button[text()='Fixtures']")))
			.then(async (e) => await e.click());
		await driver.wait(until.elementLocated(By.css('h1')));
		let h1 = await driver.findElement(By.css('h1')).getText();
		expect(h1).toBe('FIXTURES');
	});

	test("Clicking on 'Results' brings you to results page", async () => {
		await driver
			.wait(until.elementLocated(By.xpath("//a/button[text()='Results']")))
			.then(async (e) => await e.click());
		await driver.wait(until.elementLocated(By.css('h1')));
		let h1 = await driver.findElement(By.css('h1')).getText();
		expect(h1).toBe('RESULTS');
	});

	test("Clicking on 'Table' brings you to table page", async () => {
		await driver
			.wait(until.elementLocated(By.xpath("//a/button[text()='Table']")))
			.then(async (e) => await e.click());
		await driver.wait(until.elementLocated(By.css('h1')));
		let h1 = await driver.findElement(By.css('h1')).getText();
		expect(h1).toBe('TABLE');
	});
});

describe('Test general navigation of the mobile layout of the site using the nav bar', () => {
	let driver;
	beforeAll(async () => {
		driver = await new Builder().forBrowser(Browser.CHROME).build();
		await driver.get('http://localhost:3000/');
		await driver.manage().window().setRect({ width: 425, height: 1000 });
	});
	afterAll(async () => {
		await driver.quit();
	});

	test("Clicking on 'Fixtures' brings you to fixtures page", async () => {
		await driver
			.wait(until.elementLocated(By.className('hamburger-icon')))
			.then(async (e) => await e.click());
		await driver.wait(until.elementLocated(By.xpath("//a/button[text()='Fixtures']"))).then(async (e) => {
			await driver.wait(until.elementIsVisible(e));
			await e.click();
		});
		await driver.wait(until.elementLocated(By.css('h1')));
		let h1 = await driver.findElement(By.css('h1')).getText();
		expect(h1).toBe('FIXTURES');
	});

	test("Clicking on 'Results' brings you to results page", async () => {
		await driver
			.wait(until.elementLocated(By.className('hamburger-icon')))
			.then(async (e) => await e.click());
		await driver.wait(until.elementLocated(By.xpath("//a/button[text()='Results']"))).then(async (e) => {
			await driver.wait(until.elementIsVisible(e));
			await e.click();
		});
		await driver.wait(until.elementLocated(By.css('h1')));
		let h1 = await driver.findElement(By.css('h1')).getText();
		expect(h1).toBe('RESULTS');
	});

	test("Clicking on 'Table' brings you to table page", async () => {
		await driver
			.wait(until.elementLocated(By.className('hamburger-icon')))
			.then(async (e) => await e.click());
		await driver.wait(until.elementLocated(By.xpath("//a/button[text()='Table']"))).then(async (e) => {
			await driver.wait(until.elementIsVisible(e));
			await e.click();
		});
		await driver.wait(until.elementLocated(By.css('h1')));
		let h1 = await driver.findElement(By.css('h1')).getText();
		expect(h1).toBe('TABLE');
	});
});

describe('Test filters on "Fixtures" page', () => {
	let driver;
	beforeAll(async () => {
		driver = await new Builder().forBrowser(Browser.CHROME).build();
		await driver.get('http://localhost:3000/fixtures');
		await driver.manage().window().maximize();
	});
	afterAll(async () => {
		await driver.quit();
	});

	test('Setting club filter to a club displays only fixtures that contain that club', async () => {
		await driver
			.wait(until.elementLocated(By.className('team-filter-container')))
			.then(async (e) => await e.click());

		const teams = await driver
			.findElement(By.className('team-filter-dropdown'))
			.findElements(By.xpath('.//div'));
		const x = Math.floor(Math.random() * (teams.length - 1)) + 1;
		const filteredTeamName = await teams[x].getText();
		await teams[x].click();

		const matches = await driver.findElements(By.className('match'));
		for (const match of matches) {
			const teams = await match.findElements(By.xpath('.//div/td'));
			const team1 = await teams[0].getText();
			const team2 = await teams[4].getText();
			expect([team1, team2]).toContain(filteredTeamName);
		}
	});
});

describe('Test filters on "Results" page', () => {
	let driver;
	beforeAll(async () => {
		driver = await new Builder().forBrowser(Browser.CHROME).build();
		await driver.get('http://localhost:3000/results');
		await driver.manage().window().maximize();
	});
	afterAll(async () => {
		await driver.quit();
	});

	test('Setting club filter to a club displays only results that contain that club', async () => {
		await driver
			.wait(until.elementLocated(By.className('team-filter-container')))
			.then(async (e) => await e.click());

		const teams = await driver
			.findElement(By.className('team-filter-dropdown'))
			.findElements(By.xpath('.//div'));
		const x = Math.floor(Math.random() * (teams.length - 1)) + 1;
		const filteredTeamName = await teams[x].getText();
		await teams[x].click();

		const matches = await driver.findElements(By.className('match'));
		for (const match of matches) {
			const teams = await match.findElements(By.xpath('.//div/td'));
			const team1 = await teams[0].getText();
			const team2 = await teams[4].getText();
			expect([team1, team2]).toContain(filteredTeamName);
		}
	});
});
