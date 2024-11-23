const Course = require('../models/Course')
const { mongoeseToObject } = require('../../util/Mongoese')

class CourseController {

    show(req, res, next) {
        Course.findOne({slug: req.params.slug})
        .then(course => 
            res.render('courses/show', {course: mongoeseToObject(course)})
        )
        .catch(next)
    }

    create(req, res, next) {
        res.render('courses/create')
    }

    store(req, res, next) {
        const formData = req.body
        formData.image = `https://i.ytimg.com/vi/${req.body.videoId}/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDuqncXSnR8IZj8V3FuwhvaG254bw`
        const course = new Course(formData)
        course.save()
            .then(() => res.redirect('/'))
            .catch(error => {})
    }
    
}

module.exports = new CourseController