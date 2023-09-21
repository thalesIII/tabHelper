const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://swAPP:CodesmithU10@cluster0.qzanrz5.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'TabHelper'
})
    .then(() => console.log('connected to MongoDB...'))
    .catch(err => console.log('MongoDB error: ', err))

const tabSchema = new mongoose.Schema({
    name: {type: String, required: true},
    song: {type: String, required: true}
})

const Tab = mongoose.model('Tab', tabSchema);

module.exports = Tab;