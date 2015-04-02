var mongoose = require('mongoose')
    , crypto = require('crypto')
    ;

var userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: String,
    salt: String,
    hashed_pwd: String,
    roles: [String]
});

userSchema.methods = {
    authenticate: function (passwordToMatch) {
        return hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    }
};

var User = mongoose.model('User', userSchema);

User.find({}).exec(function (err, collection) {
    if (collection.length === 0) {
        var salt, hash;
        salt = createSalt();
        hash = hashPwd(salt, 'joe');
        User.create({
            firstName: 'Joe', lastName: 'Eames', userName: 'joe', salt: salt, hashed_pwd: hash, roles: []
        });
        hash = hashPwd(salt, 'john');
        User.create({
            firstName: 'John', lastName: 'Papa', userName: 'john', salt: salt, hashed_pwd: hash
        });
        hash = hashPwd(salt, 'jorge');
        User.create({
            firstName: 'Jorge', lastName: 'Ferrando', userName: 'jorge', salt: salt, hashed_pwd: hash, roles: ['admin']
        });
    }
});

function createSalt() {
    return crypto.randomBytes(128).toString('base64');
}

function hashPwd(salt, pwd) {
    var hmac = crypto.createHmac('sha1', salt);
    return hmac.update(pwd).digest('hex');
}