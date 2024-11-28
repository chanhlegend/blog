const Course = require('../models/Course')
const { mongoeseToObject } = require('../../util/Mongoese')

class CourseController {

    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then(course =>
                res.render('courses/show', { course: mongoeseToObject(course) })
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
            .catch(error => { })
    }

    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(course => res.render('courses/edit', {
                course: mongoeseToObject(course)
            }))
            .catch(next)
    }

    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next)
    }

    destroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next)
    }
}

module.exports = new CourseController