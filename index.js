const express = require('express');
const md5 = require('md5');
const app = express()
const port = 2900

const userRepository = require('./user-repository');

app.use(express.json());

app.use((req, res, next) => {
   console.log(`request called at : ${new Date()}`);
   next();
});

app.use((err,  req, res, next) => {});

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send("Bleg");
});

app.get('/users', (req, res) => {
    console.log(`request called at : ${new Date()}, ip:${req.ip}, time:, method:${req.method},route:${req.route}`);
    res.send(userRepository.getUser());
});

app.get('/users/:firstname', (req, res) => {
    res.send(userRepository.getUserByFirstname(req.params.firstname));
});

app.get('/users/Id/:id', (req, res) => {
    res.send(userRepository.getUserById(req.params.id));
});

app.post('/users', (req, res) => {
    let newUser = req.body
    newUser.password = md5(req.body.password)
    userRepository.createUser(newUser)
    res.statusCode = 201
    res.send('Utilisateur créé\n');
});

app.delete('/delete-user/:id', (req,res) => {
    userRepository.deleteUser(req.params.id)
    res.send(`Utilisateur ${req.params.id} a été supprimé`)
})

app.put('/update-user/:id', (req,res) => {
    userRepository.updateUser(req.body.id, req.body)
    res.send(`Utilisateur ${req.body.id} mis à jour`)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
