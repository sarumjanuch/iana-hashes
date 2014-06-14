var crypto = require('crypto');

var mapping = {
    md2: 'md2',
    md5: 'md5',
    'sha-1': 'sha1',
    'sha-224': 'sha224',
    'sha-256': 'sha256',
    'sha-384': 'sha384',
    'sha-512': 'sha512'
};

var names = Object.keys(mapping);


exports.getHashes = function () {
    var result = [];
    var available = crypto.getHashes();
    for (var i = 0, len = names.length; i < len; i++) {
        if (available.indexOf(mapping[names[i]]) >= 0) {
            result.push(names[i]);
        }
    }
    return result;
};

exports.createHash = function (algorithm) {
    algorithm = algorithm.toLowerCase();
    if (mapping[algorithm]) {
        algorithm = mapping[algorithm];
    }
    return crypto.createHash(algorithm);
};

exports.createHmac = function (algorithm, key) {
    algorithm = algorithm.toLowerCase();
    if (mapping[algorithm]) {
        algorithm = mapping[algorithm];
    }
    return crypto.createHmac(algorithm, key);
};
