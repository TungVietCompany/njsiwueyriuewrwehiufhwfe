function getUserIdBySessionId(session_id,connection,callback) {
    connection.query("SELECT func_getUserIdFromSession_id('" + session_id +"') as data"
        , function (err, rows) {
            if (err) {
                callback(701);
            }
            var user_id = rows[0].data;
            if(user_id != null)
            {
                callback(user_id);
            }
            else
            {
                callback(701);
            }
        });
}

module.exports.getUserIdBySessionId = getUserIdBySessionId;