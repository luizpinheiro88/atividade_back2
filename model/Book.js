const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

let Book = new Schema({
    title: {
        type: String
    },
    description:{
        type: String
    },
    year:{
        type: String
    },
    
},{collection: 'book'

});

module.exports = mongoose.model ('Book', Book);