const express = require('express')
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

app.get('/user', (req, res) => {
    res.send(userRepository.getUser());
});

app.get('/user/:firstname', (req, res) => {
    res.send(userRepository.getUserByFirstname(req.params.firstname));
});

app.post('/user', (req, res) => {
    userRepository.createUser(req.body)
    res.send('Utilisateur créé\n');
});

app.delete('/delete-user/:id', (req,res) => {
    userRepository.deleteUser(req.params.id)
    res.send(`Utilisateur ${req.params.id} a été supprimé`)
})

app.put('/update-user/:id', (req,res) => {

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
