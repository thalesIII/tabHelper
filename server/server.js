const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000; 

app.use('/build', express.static(path.join(__dirname, '../build')));

app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
})






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