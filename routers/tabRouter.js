const express = require('express');

const router = express.Router();
const Tab = require('../models/tabModels.js');

const tabQuery = async () => {
    try{
        // console.log('querying (find) ...')
        const list = await Tab.find({}, 'name song');
        // console.log('server-side query result... ', list);
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
    // console.log('recieved get req to /tabs/list...');
    const result = await tabQuery();
    // console.log('sending back:', result);
    return (!result.log
        ? res.status(200).json(result)
        : next(result));
})

router.delete('/', async (req, res, next) => {
    const { name } = req.body;
    try{
        await Tab.findOneAndDelete({name: name}, 'name song');
    } catch(err) {
        return next({log: 'ERROR while deleting tab from Mongo!', message: {err: err}});
    }

    const result = await tabQuery();
    return (!result.log
        ? res.status(200).json(result)
        : next(result));
})

module.exports = router;