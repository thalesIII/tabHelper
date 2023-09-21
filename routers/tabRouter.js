const express = require('express');

const router = express.Router();
const Tab = require('../models/tabModels.js');
const { createNextState } = require('@reduxjs/toolkit');

router.post('/', (req, res) => {  //doesn't work on dev-server
    console.log('recieved post req to /tabs...');
    const { name, song } = req.body;
    if(!name || !song) return next({status:400, message: {err: err}}) //add error messages

    Tab.findOneAndUpdate({name: name}, {name, song}, {
        new: true, //return the updated object
        upsert: true //create a document if the object does not exist
    }, (result, err) => {
        if(err) return next({message: {err: err}})
        res.status(200).json(result);
    })
})

module.exports = router;