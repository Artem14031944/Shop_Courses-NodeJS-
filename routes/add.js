const { Router } = require('express');
const Course = require('../modules/course');

const router = Router();

router.get('/', (req, res)=> {
    res.render('add', {
        title: 'Добавить курс',
        isAdd: true
    });
});

router.post('/', async (req, res) => {
    const course = new Course(req.body.title, req.body.price, req.body.img);
    await course.save();
    res.redirect('/courses');
});

module.exports = router;