const Course = require('../models/Course')
const { mutipleMongoeseToObject } = require('../../util/Mongoese')

class SiteController {

    //[GET] 
    index(req, res, next) {

        Course.find({})
            .then(courses => {
                res.render('home', { courses: mutipleMongoeseToObject(courses) })
            })
            .catch(next)
    }

    //[GET] /search
    search(req, res) {
        res.render('search')
    }
}

module.exports = new SiteController