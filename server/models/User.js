var mongoose = require('mongoose')
    , encrypt = require('../utilities/encryption')
    ;

var userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: String,
    salt: String,
    hashed_pwd: String,
    roles: [String],
    facebook: {
        id: String,
        token: String,
        name: String
    }
});

userSchema.methods = {
    authenticate: function (passwordToMatch) {
        return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    }
};

var User = mongoose.model('User', userSchema);

function createdefaultUsers() {
    User.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            var salt, hash;
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'joe');
            User.create({
                firstName: 'Joe', lastName: 'Eames', userName: 'joe', salt: salt, hashed_pwd: hash, roles: []
            });
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'john');
            User.create({
                firstName: 'John', lastName: 'Papa', userName: 'john', salt: salt, hashed_pwd: hash
            });
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'jorge');
            User.create({
                firstName: 'Jorge',
                lastName: 'Ferrando',
                userName: 'jorge',
                salt: salt,
                hashed_pwd: hash,
                roles: ['admin']
            });
        }
    });
}

exports.createdefaultUsers = createdefaultUsers;