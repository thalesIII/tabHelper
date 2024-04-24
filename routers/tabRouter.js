const express = require('express');

const router = express.Router();
const Tab = require('../models/tabModels.js');

const tabQuery = async () => {
    try{
        const list = await Tab.find({}, 'name song');
        return list;
    } catch(err) {
        return {log: 'ERROR while fetching tabs!', message: {err: err}};
    }
}

router.post('/', async (req, res, next) => {  
    //console.log('recieved post req to /tabs...', req.body);
    const { name, song } = req.body;
    if(!name || !song) return next({status:400, message: {err: 'Missing input'}}) //add error messages

    try{    
        await Tab.findOneAndUpdate({name: name}, {name, song}, {
            new: true, //return the updated object
            upsert: true //create a document if the object does not exist
        })
    } catch(err) {
        return next({message: {err: err}});
    }

    return res.status(200).json('Added successfully');
})

router.get('/list', async (req, res, next) => {
    console.log('finding your tabs')
    const result = await tabQuery();
    return (!result.log
        ? res.status(200).json(result)
        : next(result));
})

router.get('/api', async (req, res, next) => {
    console.log('fetching from ultimate-guitar')
    const requestTab = async () => {
        // 'https://tabs.ultimate-guitar.com/tab/led-zeppelin/stairway-to-heaven-tabs-9488'
        const t = await fetch('https:tabs.ultimate-guitar.com/tab/led-zeppelin/stairway-to-heaven-tabs-9488', {
            method: 'GET',
            mode: 'no-cors'
        });
        // const tab = await t.json();
        const html = await t.text();

        console.log('response: ', html)
        return html;
    }
    try{
        const rawTab = await requestTab();
        console.log('success');
        res.status(200).send(rawTab);
    } catch (err) {
        console.log('error when fetching tab')
        return next(err);
    }
})

router.delete('/', async (req, res, next) => {
    const { id } = req.body;
    try{
        await Tab.deleteOne({_id: id});
    } catch(err) {
        return next({log: 'ERROR while deleting tab from Mongo!', message: {err: err}});
    }

    const result = await tabQuery();
    return (!result.log
        ? res.status(200).json(result)
        : next(result));
})

module.exports = router;