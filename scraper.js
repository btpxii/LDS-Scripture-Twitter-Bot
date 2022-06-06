const puppeteer = require('puppeteer');
const fs = require('fs');
const scripturesFile = './scriptures.json';
const scriptures = require(scripturesFile);


const scraper = async (url) => {
    var timestamp = '[' + new Date().toUTCString() + '] ';
    console.log(timestamp + 'Scraper initialized')
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url);

    const getScripture = await page.evaluate(() => {
        const verse = document.querySelector('.active-item');
        const verseName = document.querySelector('title').innerText + ':' + verse.querySelector('.verse-number').innerText
        for (var suptag in verse.querySelectorAll('sup')) {
            verse.querySelectorAll('sup')[suptag].innerText = ''
        }
        verse.querySelector('.verse-number').innerText = ''
        const scriptureObj = {ref: verseName, scripture: verse.innerText, used: false}
        return scriptureObj;
    })
    await browser.close();
    scriptures.push(getScripture)
    fs.writeFile(scripturesFile, JSON.stringify(scriptures), function writeJSON(err) {
        if (err) return console.log(err);
        timestamp = '[' + new Date().toUTCString() + '] ';
        console.log(timestamp + 'Wrote ' + getScripture.ref + 'to ' + scripturesFile);
    });
};

// add links to be scraped here
// 'https://www.churchofjesuschrist.org/study/scriptures/bofm/1-ne/11.17?lang=eng' is the proper format
var linkArr = [
]

async function parseLinks() {
    for (let i = 0; i < linkArr.length; i++) {
        await scraper(linkArr[i])
    }
}

parseLinks()
