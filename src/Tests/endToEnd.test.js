const { By, Builder, Browser, until } = require('selenium-webdriver');

describe('Test general navigation of the site using the nav bar', () => {
	let driver;
	beforeAll(async () => {
		// set up driver with max window size
		driver = await new Builder().forBrowser(Browser.CHROME).build();
		await driver.get('http://localhost:3000/');
		await driver.manage().window().maximize();
	});
	afterAll(async () => {
		await driver.quit();
	});

	test("Clicking on 'Fixtures' brings you to fixtures page", async () => {
		// wait until Fixtures button located then click it
		await driver
			.wait(until.elementLocated(By.xpath("//a/button[text()='Fixtures']")))
			.then(async (e) => await e.click());
		// wait until h1 located and get text
		await driver.wait(until.elementLocated(By.css('h1')));
		let h1 = await driver.findElement(By.css('h1')).getText();
		expect(h1).toBe('FIXTURES');
	});

	test("Clicking on 'Results' brings you to results page", async () => {
		// wait until Results button located then click it
		await driver
			.wait(until.elementLocated(By.xpath("//a/button[text()='Results']")))
			.then(async (e) => await e.click());
		// wait until h1 located and get text
		await driver.wait(until.elementLocated(By.css('h1')));
		let h1 = await driver.findElement(By.css('h1')).getText();
		expect(h1).toBe('RESULTS');
	});

	test("Clicking on 'Table' brings you to table page", async () => {
		// wait until Table button located then click it
		await driver
			.wait(until.elementLocated(By.xpath("//a/button[text()='Table']")))
			.then(async (e) => await e.click());
		// wait until h1 located and get text
		await driver.wait(until.elementLocated(By.css('h1')));
		let h1 = await driver.findElement(By.css('h1')).getText();
		expect(h1).toBe('TABLE');
	});
});

describe('Test general navigation of the mobile layout of the site using the nav bar', () => {
	let driver;
	beforeAll(async () => {
		// set up driver with mobile window size
		driver = await new Builder().forBrowser(Browser.CHROME).build();
		await driver.get('http://localhost:3000/');
		await driver.manage().window().setRect({ width: 425, height: 1000 });
	});
	afterAll(async () => {
		await driver.quit();
	});

	test("Clicking on 'Fixtures' brings you to fixtures page", async () => {
		// wait until Hamburger icon button located then click it
		await driver
			.wait(until.elementLocated(By.className('hamburger-icon')))
			.then(async (e) => await e.click());
		// wait until Fixtures button located and visible then click it
		await driver.wait(until.elementLocated(By.xpath("//a/button[text()='Fixtures']"))).then(async (e) => {
			await driver.wait(until.elementIsVisible(e));
			await e.click();
		});
		// wait until h1 located and get text
		await driver.wait(until.elementLocated(By.css('h1')));
		let h1 = await driver.findElement(By.css('h1')).getText();
		expect(h1).toBe('FIXTURES');
	});

	test("Clicking on 'Results' brings you to results page", async () => {
		// wait until Hamburger icon button located then click it
		await driver
			.wait(until.elementLocated(By.className('hamburger-icon')))
			.then(async (e) => await e.click());
		// wait until Results button located and visible then click it
		await driver.wait(until.elementLocated(By.xpath("//a/button[text()='Results']"))).then(async (e) => {
			await driver.wait(until.elementIsVisible(e));
			await e.click();
		});
		// wait until h1 located and get text
		await driver.wait(until.elementLocated(By.css('h1')));
		let h1 = await driver.findElement(By.css('h1')).getText();
		expect(h1).toBe('RESULTS');
	});

	test("Clicking on 'Table' brings you to table page", async () => {
		// wait until Hamburger icon button located then click it
		await driver
			.wait(until.elementLocated(By.className('hamburger-icon')))
			.then(async (e) => await e.click());
		// wait until Table button located and visible then click it
		await driver.wait(until.elementLocated(By.xpath("//a/button[text()='Table']"))).then(async (e) => {
			await driver.wait(until.elementIsVisible(e));
			await e.click();
		});
		// wait until h1 located and get text
		await driver.wait(until.elementLocated(By.css('h1')));
		let h1 = await driver.findElement(By.css('h1')).getText();
		expect(h1).toBe('TABLE');
	});
});

describe('Test filters on "Fixtures" page', () => {
	let driver;
	let currentYear = new Date().getFullYear();
	beforeEach(async () => {
		// set up driver with max window size
		driver = await new Builder().forBrowser(Browser.CHROME).build();
		await driver.get('http://localhost:3000/fixtures');
		await driver.manage().window().maximize();
	});
	afterEach(async () => {
		await driver.quit();
	});

	test('Setting club filter to a club displays only fixtures that contain that club', async () => {
		// wait until team filter located then click it
		await driver
			.wait(until.elementLocated(By.className('team-filter-container')))
			.then(async (e) => await e.click());

		// get all teams from the dropdown then click a random one
		const teams = await driver
			.findElement(By.className('team-filter-dropdown'))
			.findElements(By.xpath('.//div'));
		const x = Math.floor(Math.random() * (teams.length - 1)) + 1;
		const filteredTeamName = await teams[x].getText();
		await teams[x].click();

		// check all matches to see if they contain the chosen team
		const matches = await driver.findElements(By.className('match'));
		for (const match of matches) {
			const teams = await match.findElements(By.xpath('.//div/td'));
			const team1 = await teams[0].getText();
			const team2 = await teams[4].getText();
			expect([team1, team2]).toContain(filteredTeamName);
		}
	});

	test('Setting starting date filter only displays fixtures after that date', async () => {
		// wait until start-date input located then type date 01-15-currentYear
		await driver
			.wait(until.elementLocated(By.id('start-date')))
			.then(async (e) => await e.sendKeys('01-15-' + currentYear));

		// check all matches to see if they are after the date
		const matches = await driver.findElements(By.className('matches-on-date'));
		for (const match of matches) {
			const matchDate = await match.findElement(By.css('h2')).then((e) => e.getText());
			expect(new Date(matchDate) >= new Date('01-15-' + currentYear)).toBeTruthy();
		}
	});

	test('Setting ending date filter only displays fixtures before that date', async () => {
		// wait until end-date input located then type date 01-15-currentYear
		await driver
			.wait(until.elementLocated(By.id('end-date')))
			.then(async (e) => await e.sendKeys('01-15-' + currentYear));

		// check all matches to see if they are before the date
		const matches = await driver.findElements(By.className('matches-on-date'));
		for (const match of matches) {
			const matchDate = await match.findElement(By.css('h2')).then((e) => e.getText());
			expect(new Date(matchDate) <= new Date('01-15-' + currentYear)).toBeTruthy();
		}
	});

	test('Setting starting and ending date filter only displays fixtures between those corresponding dates', async () => {
		// wait until start-date, end-date input located then type date 01-15-currentYear, 03-15-currentYear
		await driver
			.wait(until.elementLocated(By.id('start-date')))
			.then(async (e) => await e.sendKeys('01-15-' + currentYear));
		await driver
			.wait(until.elementLocated(By.id('end-date')))
			.then(async (e) => await e.sendKeys('03-15-' + currentYear));

		// check all matches to see if they are between the 2 dates
		const matches = await driver.findElements(By.className('matches-on-date'));
		for (const match of matches) {
			const matchDate = await match.findElement(By.css('h2')).then((e) => e.getText());
			expect(
				new Date('01-15-' + currentYear) <= new Date(matchDate) &&
					new Date(matchDate) <= new Date('03-15-' + currentYear)
			).toBeTruthy();
		}
	});

	test('Setting club and starting/ending date filter only displays fixtures that include that club between those corresponding dates', async () => {
		// wait until team filter located then click it
		await driver
			.wait(until.elementLocated(By.className('team-filter-container')))
			.then(async (e) => await e.click());

		// get all teams from the dropdown then click a random one
		const teams = await driver
			.findElement(By.className('team-filter-dropdown'))
			.findElements(By.xpath('.//div'));
		const x = Math.floor(Math.random() * (teams.length - 1)) + 1;
		const filteredTeamName = await teams[x].getText();
		await teams[x].click();

		// get all teams from the dropdown then click a random one
		await driver
			.wait(until.elementLocated(By.id('start-date')))
			.then(async (e) => await e.sendKeys('01-01-' + currentYear));
		await driver
			.wait(until.elementLocated(By.id('end-date')))
			.then(async (e) => await e.sendKeys('04-01-' + currentYear));

		// check all matches to see if they contain the chosen team and are between the 2 dates
		const matches = await driver.findElements(By.className('matches-on-date'));
		for (const match of matches) {
			const teams = await match.findElements(By.xpath('.//tr/div/td'));
			const team1 = await teams[0].getText();
			const team2 = await teams[4].getText();
			expect([team1, team2]).toContain(filteredTeamName);

			const matchDate = await match.findElement(By.css('h2')).then((e) => e.getText());
			expect(
				new Date('01-01-' + currentYear) <= new Date(matchDate) &&
					new Date(matchDate) <= new Date('04-01-' + currentYear)
			).toBeTruthy();
		}
	});
});

describe('Test filters on "Results" page', () => {
	let driver;
	let currentYear = new Date().getFullYear();

	beforeEach(async () => {
		// set up driver with max window size
		driver = await new Builder().forBrowser(Browser.CHROME).build();
		await driver.get('http://localhost:3000/results');
		await driver.manage().window().maximize();
	});
	afterEach(async () => {
		await driver.quit();
	});

	test('Setting club filter to a club displays only results that contain that club', async () => {
		// wait until team filter located then click it
		await driver
			.wait(until.elementLocated(By.className('team-filter-container')))
			.then(async (e) => await e.click());

		// get all teams from the dropdown then click a random one
		const teams = await driver
			.findElement(By.className('team-filter-dropdown'))
			.findElements(By.xpath('.//div'));
		const x = Math.floor(Math.random() * (teams.length - 1)) + 1;
		const filteredTeamName = await teams[x].getText();
		await teams[x].click();

		// check all matches to see if they contain the chosen team
		const matches = await driver.findElements(By.className('match'));
		for (const match of matches) {
			const teams = await match.findElements(By.xpath('.//div/td'));
			const team1 = await teams[0].getText();
			const team2 = await teams[4].getText();
			expect([team1, team2]).toContain(filteredTeamName);
		}
	});

	test('Setting starting date filter only displays results after that date', async () => {
		// wait until start-date input located then type date 01-15-currentYear
		await driver
			.wait(until.elementLocated(By.id('start-date')))
			.then(async (e) => await e.sendKeys('01-15-' + currentYear));

		// check all matches to see if they are after the date
		const matches = await driver.findElements(By.className('matches-on-date'));
		for (const match of matches) {
			const matchDate = await match.findElement(By.css('h2')).then((e) => e.getText());
			expect(new Date(matchDate) >= new Date('01-15-' + currentYear)).toBeTruthy();
		}
	});

	test('Setting ending date filter only displays results before that date', async () => {
		// wait until end-date input located then type date 01-15-currentYear
		await driver
			.wait(until.elementLocated(By.id('end-date')))
			.then(async (e) => await e.sendKeys('01-15-' + currentYear));

		// check all matches to see if they are before the date
		const matches = await driver.findElements(By.className('matches-on-date'));
		for (const match of matches) {
			const matchDate = await match.findElement(By.css('h2')).then((e) => e.getText());
			expect(new Date(matchDate) <= new Date('01-15-' + currentYear)).toBeTruthy();
		}
	});

	test('Setting starting and ending date filter only displays results between those corresponding dates', async () => {
		// wait until start-date, end-date input located then type date 01-15-currentYear, 03-15-currentYear
		await driver
			.wait(until.elementLocated(By.id('start-date')))
			.then(async (e) => await e.sendKeys('01-15-' + currentYear));
		await driver
			.wait(until.elementLocated(By.id('end-date')))
			.then(async (e) => await e.sendKeys('03-15-' + currentYear));

		// check all matches to see if they are between the 2 dates
		const matches = await driver.findElements(By.className('matches-on-date'));
		for (const match of matches) {
			const matchDate = await match.findElement(By.css('h2')).then((e) => e.getText());
			expect(
				new Date('01-15-' + currentYear) <= new Date(matchDate) &&
					new Date(matchDate) <= new Date('03-15-' + currentYear)
			).toBeTruthy();
		}
	});

	test('Setting club and starting/ending date filter only displays results that include that club between those corresponding dates', async () => {
		// wait until team filter located then click it
		await driver
			.wait(until.elementLocated(By.className('team-filter-container')))
			.then(async (e) => await e.click());

		// get all teams from the dropdown then click a random one
		const teams = await driver
			.findElement(By.className('team-filter-dropdown'))
			.findElements(By.xpath('.//div'));
		const x = Math.floor(Math.random() * (teams.length - 1)) + 1;
		const filteredTeamName = await teams[x].getText();
		await teams[x].click();

		// get all teams from the dropdown then click a random one
		await driver
			.wait(until.elementLocated(By.id('start-date')))
			.then(async (e) => await e.sendKeys('01-01-' + currentYear));
		await driver
			.wait(until.elementLocated(By.id('end-date')))
			.then(async (e) => await e.sendKeys('04-01-' + currentYear));

		// check all matches to see if they contain the chosen team and are between the 2 dates
		const matches = await driver.findElements(By.className('matches-on-date'));
		for (const match of matches) {
			const teams = await match.findElements(By.xpath('.//tr/div/td'));
			const team1 = await teams[0].getText();
			const team2 = await teams[4].getText();
			expect([team1, team2]).toContain(filteredTeamName);

			const matchDate = await match.findElement(By.css('h2')).then((e) => e.getText());
			expect(
				new Date('01-01-' + currentYear) <= new Date(matchDate) &&
					new Date(matchDate) <= new Date('04-01-' + currentYear)
			).toBeTruthy();
		}
	});
});
