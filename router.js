const { randomUUID } = require('crypto');
const express = require('express');
var router = express.Router();
const md5 = require('md5');
var responseTime = require('response-time')
const userRepository = require('./user-repository');

router.use(express.json());
router.use(responseTime())

router.use((req, res, next) => {
   console.log(`request called at : ${new Date()}`);
   next();
});

router.get('/', (req, res) => {
    res.send("Bleg");
});

router.get('/users', (req, res) => {
    console.log(`request called at : ${new Date()}, ip:${req.ip}, time:, method:${req.method}, path:${req.path}`);
    res.send(userRepository.getUser());
});

router.get('/users/:firstname', (req, res) => {
    console.log(`request called at : ${new Date()}, ip:${req.ip}, time:, method:${req.method}, path:${req.path}`);
    res.send(userRepository.getUserByFirstname(req.params.firstname));
});

router.get('/users/Id/:id', (req, res) => {
    console.log(`request called at : ${new Date()}, ip:${req.ip}, time:, method:${req.method}, path:${req.path}`);
    res.send(userRepository.getUserById(req.params.id));
});

router.post('/users', (req, res) => {
    console.log(`request called at : ${new Date()}, ip:${req.ip}, time:, method:${req.method}, path:${req.path}`);
    let newUser = req.body
    newUser.password = md5(req.body.password)
    newUser.id = randomUUID()
    userRepository.createUser(newUser)
    res.statusCode = 201
    res.send('Utilisateur créé\n');
});

router.delete('/delete-user/:id', (req,res) => {
    console.log(`request called at : ${new Date()}, ip:${req.ip}, time:, method:${req.method}, path:${req.path}`);
    userRepository.deleteUser(req.params.id)
    res.send(`Utilisateur ${req.params.id} a été supprimé`)
})

router.put('/update-user/:id', (req,res) => {
    console.log(`request called at : ${new Date()}, ip:${req.ip}, time:, method:${req.method}, path:${req.path}`);
    userRepository.updateUser(req.body.id, req.body)
    res.send(`Utilisateur ${req.body.id} mis à jour`)
})

module.exports = router