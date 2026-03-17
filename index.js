const jsonfile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git');
const random = require('random');

function getRandomInRange(min, max) { 
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}


const FILE_PATH = './data.json';
const makeCommit = n => {
    if (n === 0) return simpleGit().push();
    const weeks = getRandomInRange(0, 54);
    const days = getRandomInRange(0, 6);
    const DATE = moment().subtract(2, 'y').add(1, 'd').add(weeks, 'w').add(days, 'd').format();
    const data = { date: DATE };
    console.log(DATE);
    jsonfile.writeFile(FILE_PATH, data, () => {
        simpleGit().add([FILE_PATH]).commit(DATE, { '--date': DATE }, makeCommit.bind(this, --n));
    });
}
// weeks - for weeks goes form 0 - 54
// days - for days goes form 0 - 6

// test
makeCommit(1000);