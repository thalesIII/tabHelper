const cheerio = require('cheerio');

module.exports = {
    fetchTab: async (req, res, next) => {
        const requestTab = async () => {
            const url = req.body.URL;
            const t = await fetch(url, {
                mode: 'no-cors'
            });
            const html = await t.text();
            return html;
        }
        try{
            const rawTab = await requestTab();
            res.locals.rawTab = rawTab;
            return next();
        } catch (err) {
            console.log('error when fetching tab')
            return next(err);
        }
    },

    parseTab: (req, res, next) => {
        const html = res.locals.rawTab;

        const $ = cheerio.load(html);
        const data = $('.js-store').data('content');

        // extract tab data
        const ptr = data.store.page.data;

        // console.log('data: ', data, "\n\nptr: ", ptr);
        console.log(ptr);

        if(!ptr.tab) return next({ 
            log: 'Ultimate Guitar pro required :(',
            status: 403,
            message: { err: 'Not a free tab' }
        })

        const songName = ptr.tab.song_name;
        const artistName = ptr.tab.artist_name;
        const tab = ptr.tab_view.wiki_tab.content;

        const author = ptr.tab_view.wiki_tab.username;
        const contributors = ptr.tab_view.contributors.map(obj => obj.username); // [ {username: '' }, ... ] => []

        const responseData = {
            songName,
            artistName,
            tab,
            author,
            contributors,
            url: req.body.URL
        };

        res.locals.result = responseData;
        return next();
    }
}

