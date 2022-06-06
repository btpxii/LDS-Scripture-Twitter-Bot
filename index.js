const rwClient = require("./twitterClient.js");
const fs = require('fs');
const CronJob = require("cron").CronJob;
const scripturesFile = './scriptures.json';
const scriptures = require(scripturesFile);

function getScripture () {
    let i = Math.floor(Math.random() * scriptures.length);
    let scripture;
    while (scriptures[i].used === true) {
        i = Math.floor(Math.random() * scriptures.length);
    }
    scripture = scriptures[i].ref + '\n\n' + scriptures[i].scripture + '\n';
    scriptures[i].used = true;
    fs.writeFile(scripturesFile, JSON.stringify(scriptures), function writeJSON(err) {
        if (err) return console.log(err);
        timestamp = '[' + new Date().toUTCString() + '] ';
        console.log(timestamp + 'Marked ' + scriptures[i].ref + 'as used in ' + scripturesFile);
      });
    return scripture
}

const tweet = async () => {
    let message = getScripture()
    try {
        await rwClient.v1.tweet(message)
    } catch (e) {
        console.error(e)
    }
}

// adjust chronjob argument to change scheduled tweet time
const job = new CronJob("0 8 * * *", () => {
    var timestamp = '[' + new Date().toUTCString() + '] ';
    console.log(timestamp + 'Tweet sending...')
    tweet()
    timestamp = '[' + new Date().toUTCString() + '] ';
    console.log(timestamp + 'Tweet sent!')
})

job.start();

// // check if scripture would be too long to tweet
// for (let i = 0; i < scriptures.length; i++) {
//     if ((scriptures[i].ref + scriptures[i].scripture + "  ").length > 280) {
//         console.log(scriptures[i].ref)
//     }
// }