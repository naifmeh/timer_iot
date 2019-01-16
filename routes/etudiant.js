var express = require('express');
var router = express.Router();

/* GET prof listing. */
router.get('/', function(req, res, next) {
    const controller = require('../controllers/timer_controller');

    let comments = [],
        prof = "",
        timer = 0,
        deadline = 0,
        etudiant = "";

    let infos = controller.read_infos();
    if(infos) {
        prof = infos.prof;
        deadline = infos.deadline;
        timer = infos.timer;
        etudiant = infos.etudiant;
    }

    comments = controller.read_comments();

    res.render('etudiant', {
        deadline: deadline,
        prof: prof,
        timer: timer,
        etudiant: etudiant,
        comments: comments,
    });
});

module.exports = router;