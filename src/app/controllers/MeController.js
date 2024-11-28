const Course = require('../models/Course')
const { mutipleMongoeseToObject } = require('../../util/Mongoese')

class MeController {

    storedCourses(req, res, next) {
        Course.find({})
            .then(courses => res.render('me/stored-courses',
                { courses: mutipleMongoeseToObject(courses) }))
            .catch(next)
    }
}

module.exports = new MeController