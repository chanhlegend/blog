const mongoose = require('mongoose')
const Schema = mongoose.Schema

//thư viện giúp generator slug vào database
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const Course = new Schema({
    name: { type: String },
    description: { type: String },
    image: { type: String },
    videId: { type: String },
    level: { type: String },
    slug: { type: String, slug: 'name', unique: true } //tạo slug bằng name, thay space = '-'
    // unique dùng để tránh tạo trùng id
}, { timestamps: true });

module.exports = mongoose.model('Course', Course)