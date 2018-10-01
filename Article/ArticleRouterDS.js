const https = require('https');
const Article = require('./Article');
const urlDs = 'https://lab7goodnews-ds.herokuapp.com/stories';
// const urlDs = 'https://lab7goodnews-ds.herokuapp.com/stories_2/';

setInterval(() => {
    let newTimestamp = new Date(Date.now() - 1 * 60 * 60 * 1000);
    newTimestamp = newTimestamp.toISOString();
    // console.log(typeof newTimestamp);
    // console.log('newTimestamp: ', newTimestamp);
    // console.log(`${urlDs}/?timestamp="${newTimestamp}"`);
    https.get(`${urlDs}/?timestamp="${newTimestamp}"`, (res) => {
    const { statusCode } = res;
    const contentType = res.headers['content-type'];

    let error;
    // if (statusCode !== 200) {
    //     error = new Error('Request Failed.\n' +
    //                     `Status Code: ${statusCode}`);
    // } else if (!/^application\/json/.test(contentType)) {
    //     error = new Error('Invalid content-type.\n' +
    //                     `Expected application/json but received ${contentType}`);
    // }
    // if (error) {
    //     console.error(error.message);
    //     // consume response data to free up memory
    //     res.resume();
    //     return;
    // }

    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => { 
        rawData += chunk; 
        });
    res.on('end', () => {
        try {
        const parsedData = JSON.parse(rawData);
        // console.log('parsedData: ', parsedData);

            Article
            .insertMany(parsedData, (err, data) => {
                if (err) console.log('insertMany error: ', err);
                console.log(data);
            });

        } catch (e) {
        console.error('catch error: ', e.message);
        }
    });
    }).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
})
}, 36000000);
