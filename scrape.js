
    const request = require('request');
    const cheerio = require('cheerio');
    const fs = require('fs');
    const writeStream = fs.createWriteStream('post.csv');

    const url = 'https://somethinghitme.com/';

    // Write Headers
    writeStream.write(`Title,Link,Date \n`);

    request(url, (error, response, html) =>
    {
        if(!error && response.statusCode == 200)
        {
            const $ = cheerio.load(html);

            $('article').each((i, el) =>
            {

                const title ='"' + $(el).find('h3').text() + '"';
                const link = '"' + $(el).find('a').attr('href') + '"';
                const date = '"' + $(el).find('small a').text() + '"';

                // Write Row To CSV
                writeStream.write(`${title},${link},${date}\n`);
            });

            console.log('Scraping Done...');
        }
    });
