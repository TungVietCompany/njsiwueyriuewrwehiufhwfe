function getUserIdBySessionId(session_id,connection,callback) {
    connection.query("SELECT func_getUserIdFromSession_id('" + session_id +"') as data"
        , function (err, rows) {
            if (err) {
                callback('_701_');
            }
            var user_id = rows[0].data;
            if(user_id != null)
            {
                callback(user_id);
            }
            else
            {
                callback('_701_');
            }
        });
}

module.exports.getUserIdBySessionId = getUserIdBySessionId;