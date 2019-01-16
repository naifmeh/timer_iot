var express = require('express');
var router = express.Router();

/* GET prof listing. */
router.get('/', function(req, res, next) {
    res.render('prof');
});

router.post('/timer', function(req, res, next) {
    const controller = require('../controllers/timer_controller');
    const moment = require('moment');
    
    let commentaires = [];
    let createur = "",
        etudiant = "",
        timer = 0,
        infos = {};

    if(req.body.identifiant && req.body.etudiant && req.body.timer) {
        res.cookie('prof', req.body.identifiant, {maxAge:20*60*1000});
        let deadline = moment.unix(moment().unix()+req.body.timer*60).format("MM/DD/YYYY LTS").toString();
        controller.handle_infos(req.body.identifiant, req.body.etudiant, req.body.timer, deadline);
        controller.handle_timer(deadline, req.body.timer*60);
    } else if(req.body.identifiant && !req.body.etudiant && !req.body.timer)
    {
        res.cookie('prof', req.body.identifiant, {maxAge:20*60*1000});
    }

    infos = controller.read_infos();
    timer = infos.timer;
    let deadline = infos.deadline;

    

    if(infos) {
        createur = infos.prof;
        etudiant = infos.etudiant;
    }

    let prof_cookie = req.cookies.prof;
    if(prof_cookie === undefined) {
        prof_cookie = "anonymous";
    }

    console.log(req.cookies);

    commentaires = controller.read_comments();
    if(req.body.comment) {
        commentaires = controller.handle_comment({"author": prof_cookie,"text":req.body.comment});
     }
    
    res.render('timer', {
        deadline: deadline,
        timer: timer,
        prof: createur,
        etudiant: etudiant,
        comments: commentaires
    });
});

router.get('/timer', (req, res, next) => {
    const controller = require('../controllers/timer_controller');
    let deadline = 0,
        timer = 0,
        createur = "",
        etudiant = "",
        comments = [];

    let infos = controller.read_infos();

    if(infos) {
        deadline = infos.deadline;
        timer = infos.timer;
        createur = infos.prof;
        etudiant = infos.etudiant;
    }

    comments = controller.read_comments();

    let prof_cookie = req.cookies.prof;
    if(prof_cookie === undefined) {
        prof_cookie = "anonymous";
    }

    res.render('timer', {
        deadline: deadline,
        timer: timer,
        prof: createur,
        etudiant: etudiant,
        comments: comments,
    })


});



module.exports = router;
