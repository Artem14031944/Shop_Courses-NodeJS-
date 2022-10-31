const { Router } = require('express');
const Course = require('../modules/course');
const router = Router();


router.get('/', async (req, res) => {
    const courses = await Course.getAll();
    res.render('courses', {
        title: 'Курсы',
        isCourses: true,
        courses
    });
});

router.get('/:id/edit', async (req, res)=> {
    const course = await Course.getById(req.params.id)
    if(!req.query.allow) {
        return res.redirect('/')
    };

    res.render('course-edit', {
        title: `Редактировать ${course.title}`,
        course
    })
});

router.post('/edit', async (req, res) => {
    await Course.updata(req.body);
    res.redirect('/courses')
})

router.get('/:id', async (req, res) => {
    const course = await Course.getById(req.params.id);
    res.render('course', {
        layout: 'empty',
        title: `Курс ${course.title}`,
        course
    })
});

module.exports = router;