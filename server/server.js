const express = require('express');
const path = require('path');
const tabRouter = require('../routers/tabRouter.js')

const app = express();
const PORT = 3000; 

app.use(express.json());

app.use('/build', express.static(path.join(__dirname, '../build')));
app.use('/stylesheets', express.static(path.join(__dirname, '../client/stylesheets')));

app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
})

app.use('/tabs', tabRouter);




//unknown route handler
app.use('*', (req, res) => {
    res.status(404).json('Page not found')
})

//global error handler
app.use((err, req, res, next) => {
    let defaultERR = {
        log: 'Error occured',
        status: 500,
        message: {err: 'Unknown error'}
    }
    defaultERR = Object.assign({}, defaultERR, err);
    console.log(defaultERR.log);
    return res.status(defaultERR.status).json(defaultERR.message);
})

app.listen(PORT, () => {
    console.log('Listening to PORT 3000...');
})