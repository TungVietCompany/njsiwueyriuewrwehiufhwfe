var crypto = require('crypto');

function getMD5Code(data) {
    return crypto.createHash('md5').update(data).digest("hex");
}

function getMD5ByTime(data) {
    return crypto.createHash('md5').update(new Date() + data).digest("hex");
}

module.exports.getMD5Code = getMD5Code;
module.exports.getMD5ByTime = getMD5ByTime;