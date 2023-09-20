const express = require('express');

const app = express();
const PORT = 3000; 

app.get('/', (req, res) => {
    res.status(200).sendFile('../client/index.html')
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