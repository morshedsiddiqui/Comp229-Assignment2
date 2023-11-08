const { Int32 } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Products = new Schema({

    name:{
        type: String
    },

    description:{
        type: String
    },

    price:{
        type: Number
    },

    published:{
        type: Boolean
    },
    category:{
        type: String
    }
});





module.exports = mongoose.model('Products',Products);
