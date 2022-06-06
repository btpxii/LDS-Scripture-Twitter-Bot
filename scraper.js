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
    'https://www.churchofjesuschrist.org/study/scriptures/bofm/1-ne/11.17?lang=eng',
    'https://www.churchofjesuschrist.org/study/scriptures/bofm/1-ne/1.20?lang=eng',
    'https://www.churchofjesuschrist.org/study/scriptures/bofm/1-ne/20.10?lang=eng',
    'https://www.churchofjesuschrist.org/study/scriptures/bofm/1-ne/21.13?lang=eng',
    'https://www.churchofjesuschrist.org/study/scriptures/bofm/1-ne/3.7?lang=eng',
    'https://www.churchofjesuschrist.org/study/scriptures/bofm/1-ne/9.6?lang=eng',
    'https://www.churchofjesuschrist.org/study/scriptures/bofm/2-ne/26.28?lang=eng',
    'https://www.churchofjesuschrist.org/study/scriptures/bofm/2-ne/2.2?lang=eng',
    'https://www.churchofjesuschrist.org/study/scriptures/bofm/2-ne/2.25?lang=eng',
    'https://www.churchofjesuschrist.org/study/scriptures/bofm/2-ne/31.3?lang=eng',
    'https://www.churchofjesuschrist.org/study/scriptures/bofm/3-ne/22.13?lang=eng',
    'https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/11.43?lang=eng',
    'https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/36.3?lang=eng',
    'https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/40.23?lang=eng',
    'https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/42.8?lang=eng',
    'https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/7.11?lang=eng',
    'https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/7.12?lang=eng',
    'https://www.churchofjesuschrist.org/study/scriptures/bofm/ether/12.27?lang=eng',
    'https://www.churchofjesuschrist.org/study/scriptures/bofm/ether/12.4?lang=eng',
    'https://www.churchofjesuschrist.org/study/scriptures/bofm/moro/10.32?lang=eng',
    'https://www.churchofjesuschrist.org/study/scriptures/bofm/mosiah/18.9?lang=eng',
    'https://www.churchofjesuschrist.org/study/scriptures/bofm/mosiah/23.18?lang=eng',
    'https://www.churchofjesuschrist.org/study/scriptures/bofm/mosiah/4.27?lang=eng',
    'https://www.churchofjesuschrist.org/study/scriptures/bofm/morm/5.23?lang=eng',
    'https://www.churchofjesuschrist.org/study/scriptures/bofm/moro/7.41?lang=eng',
    'https://www.churchofjesuschrist.org/study/scriptures/bofm/3-ne/1.13?lang=eng',
    'https://www.churchofjesuschrist.org/study/scriptures/bofm/mosiah/4.9?lang=eng',
    'https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/37.36?lang=eng',
    'https://www.churchofjesuschrist.org/study/scriptures/bofm/ether/12.8?lang=eng',
    'https://www.churchofjesuschrist.org/study/scriptures/bofm/mosiah/24.15?lang=eng',
    'https://www.churchofjesuschrist.org/study/scriptures/bofm/1-ne/21.16?lang=eng',
    'https://www.churchofjesuschrist.org/study/scriptures/bofm/morm/9.12?lang=eng',
    'https://www.churchofjesuschrist.org/study/scriptures/bofm/moro/7.10?lang=eng',
    'https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/30.60?lang=eng',
    'https://www.churchofjesuschrist.org/study/scriptures/bofm/2-ne/31.7?lang=eng',
    'https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/5.62?lang=eng',
    'https://www.churchofjesuschrist.org/study/scriptures/bofm/2-ne/2.7?lang=eng',
    'https://www.churchofjesuschrist.org/study/scriptures/bofm/2-ne/32.3?lang=eng',
    'https://www.churchofjesuschrist.org/study/scriptures/bofm/2-ne/31.15?lang=eng',
    'https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/39.17?lang=eng',
    'https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/32.15?lang=eng',
    'https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/5.13?lang=eng',
    'https://www.churchofjesuschrist.org/study/scriptures/bofm/1-ne/7.12?lang=eng',
    'https://www.churchofjesuschrist.org/study/scriptures/bofm/2-ne/31.19?lang=eng',
    'https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/32.21?lang=eng',
    'https://www.churchofjesuschrist.org/study/scriptures/bofm/ether/12.6?lang=eng',
    'https://www.churchofjesuschrist.org/study/scriptures/bofm/moro/7.33?lang=eng',
    'https://www.churchofjesuschrist.org/study/scriptures/bofm/2-ne/25.26?lang=eng',
    'https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/34.32?lang=eng',
    'https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/37.35?lang=eng'
]

async function parseLinks() {
    for (let i = 0; i < linkArr.length; i++) {
        await scraper(linkArr[i])
    }
}

parseLinks()
