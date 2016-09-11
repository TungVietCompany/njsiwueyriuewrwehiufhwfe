var md5 = require('../Library/MD5');
var sessionDao = require('./SessionDAO');

function addBook(book,connection,callback) {
    sessionDao.getUserIdBySessionId(book.session_id,connection,function (response) {
        if(response != 701)
        {
            var query = "call sp_insert_book('" + md5.getMD5ByTime(book.title) + "','"
                + book.title + "','" + book.author + "','"
                + book.photo + "','" + book.hash_tag + "'," + book.location_longitude + ","
                + book.location_latitude + ",'"+book.genre+"','"+ book.b_condition +"','"+book.b_action+"'" +
                ",0,NOW(),'"+response+"')";
            connection.query(query
                , function (err, rows) {
                    if (err) {
                        callback(701);
                    }
                    callback(200);
                });
        }
        else
        {
            callback(701);
        }
    });
}

function addBook_ios(book,connection,callback) {
    sessionDao.getUserIdBySessionId(book.session_id,connection,function (response) {
        if(response != 701)
        {
            var query = "call sp_insert_book('" + md5.getMD5ByTime(book.title) + "','"
                + book.title + "','" + book.author + "','"
                + book.photo + "','" + book.hash_tag + "'," + book.location_longitude + ","
                + book.location_latitude + ",'"+book.genre+"','"+ book.b_condition +"','"+book.b_action+"'" +
                ",0,NOW(),'"+response+"')";
            connection.query(query
                , function (err, rows) {
                    if (err) {

                        callback(701);
                    }
                    callback(200);
                });
        }
        else
        {
            callback(701);
        }
    });
}

function getBookInfoById(book,connection,callback) {
    sessionDao.getUserIdBySessionId(book.session_id,connection,function (response) {
        if(response != 701)
        {
            var query = "call sp_getBookById('" + book.book_id + "','"+ response +"')";
            connection.query(query
                , function (err, rows) {
                    if (err) {
                        callback(701);
                    }
                    callback(rows[0][0]);
                });
        }
        else
        {
            callback(701);
        }
    });
}




function getAllBookByUserId(session_id,connection,callback) {
    sessionDao.getUserIdBySessionId(session_id,connection,function (response) {
        if(response != 701)
        {
            var query = "call sp_getAllBookByUser('"+ response +"')";
            connection.query(query
                , function (err, rows) {
                    if (err) {
                        callback(701);
                    }
                    callback(rows[0]);
                });
        }
        else
        {
            callback(701);
        }
    });
}

function getAllBook(connection,callback) {
    var query = "call Book_GetAll()";
    connection.query(query
        , function (err, rows) {
            if (err) {
                callback(701);
            }
            callback(rows[0]);
        });
}

function updateBook(book,connection,callback) {
    sessionDao.getUserIdBySessionId(book.session_id,connection,function (response) {
        if(response != 701)
        {
            var query = "call sp_updatebook('" + book.id +"','"
                + book.title + "','" + book.author + "','"
                + book.photo + "','" + book.hash_tag + "'," + book.location_longitude + ","
                + book.location_latitude + ",'"+book.genre+"','"+ book.b_condition +"','"+book.b_action+"')";
            connection.query(query
                , function (err, rows) {
                    if (err) {
                        callback(701);
                    }
                    callback(200);
                });
        }
        else
        {
            callback(701);
        }
    });
}

module.exports.getAllBook = getAllBook;
module.exports.updateBook = updateBook;
module.exports.addBook_ios = addBook_ios;
module.exports.getAllBookByUserId = getAllBookByUserId;
module.exports.getBookInfoById = getBookInfoById;
module.exports.addBook = addBook;