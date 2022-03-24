const user = require('./db')

const createUser = function(data) {
    user.push(data);
}

const getUser = function() {
    return user;
}

const getUserByFirstname = function(firstName) {
    let users = []
    user.forEach(elem => {
        if (elem.firstname === firstName) {
            users.push(elem)
        }
    })
    return users
}


const getUserById = function(id) {
    let users = []
    user.forEach(elem => {
        if (elem.id === parseInt(id)) {
            users.push(elem)
        }
    })
    return users
}

const updateUser = function(id, data) {
    for (const elem in user) {
        if (parseInt(user[elem].id) === parseInt(id)) {
            user[elem] = data
            return user[elem]
        }
    }
}

const deleteUser = function(id) {
    for (const elem in user) {
        if (parseInt(user[elem].id) === parseInt(id)) {
            return user.splice(elem,1)
        }
    }
}



module.exports = {
    getUser,
    getUserByFirstname,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}