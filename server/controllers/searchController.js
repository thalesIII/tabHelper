const cheerio = require('cheerio');

module.exports = { 
    searchUltimateGuitar: async (req, res, next) => {
        const requestTab = async () => {
            const searchParam = req.body.searchParam.replace(' ', '%20');
            const url = `https://www.ultimate-guitar.com/search.php?search_type=title&value=${searchParam}`;
            const t = await fetch(url, {
                mode: 'no-cors'
            });
            const html = await t.text();
            return html;
        }
        try{
            const pageData = await requestTab();
            res.locals.pageData = pageData;
            return next();
        } catch (err) {
            console.log('error when fetching tab')
            return next(err);
        }
    },

    extractLinks: (req, res, next) => {
        const $ = cheerio.load(res.locals.pageData);

        const dataContent = $('.js-store').attr('data-content');
        const jsonData = JSON.parse(dataContent);
        const results = jsonData.store.page.data.results;

        const extractedLinks = [];
        for(const result of results) {
            if (result.tab_url) {
                const linkInfo = {
                    songName: result.song_name,
                    artistName: result.artist_name,
                    type: result.type,
                    difficulty: result.difficulty,
                    tabUrl: result.tab_url
                };
                extractedLinks.push(linkInfo);
            }
        };

        res.locals.links = extractedLinks;
        return next();
    }
}