const express = require('express');

const router = express.Router();
const Tab = require('../models/tabModels.js');

router.post('/', async (req, res, next) => {  //doesn't work on dev-server
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
    console.log('recieved get req to /tabs/list...');

    try{
        console.log('querying (find) ...')
        const list = await Tab.find({}, 'name song');
        //console.log('server-side query result... ', list);
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json(list);
    } catch(err) {
        return next({log: 'ERROR while querying saved tabs!', message: {err: err}});
    }
})

module.exports = router;