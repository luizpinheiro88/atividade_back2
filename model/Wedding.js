const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

let Wedding = new Schema({
    noivos: {
        type: String
    },
    dataCasamento:{
        type: String
    },
    local:{
        type: String
    },
    numeroConvidados: {
        type: String
    }
},{collection: 'wedding'

});

module.exports = mongoose.model ('Wedding', Wedding);