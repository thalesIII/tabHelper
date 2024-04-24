module.exports = {
    fetchTab: async (req, res, next) => {
        console.log('fetching from ultimate-guitar')
        const requestTab = async () => {
            //url will be paramaterized
            const url = 'https://tabs.ultimate-guitar.com/tab/led-zeppelin/stairway-to-heaven-tabs-9488'
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
        console.log('in parseTab... ', res.locals.rawTab)
        return next();
    }
}

