var md5 = require('../Library/MD5');
var sessionDao = require('./SessionDAO');

function addBook(book, connection, callback) {
    console.log(book);
    sessionDao.getUserIdBySessionId(book.session_id, connection, function (response) {
        if (response != '_701_') {
            var query = "call sp_insert_book('"
                + book.title + "','" + book.author + "','"
                + book.photo + "','" + book.hash_tag + "'," + book.location_longitude + ","
                + book.location_latitude + ",'" + book.genre + "','" + book.b_condition + "','" + book.b_action + "'" +
                ",0,NOW()," + response + "," + book.price + ")";
            connection.query(query
                , function (err, rows) {
                    if (err) {
                        callback(701);
                    }
                    callback(200);
                });
        }
        else {
            callback(701);
        }
    });
}

function addBook_ios(book, connection, callback) {
    sessionDao.getUserIdBySessionId(book.session_id, connection, function (response) {
        if (response != 701) {
            var query = "call sp_insert_book('" + md5.getMD5ByTime(book.title) + "','"
                + book.title + "','" + book.author + "','"
                + book.photo + "','" + book.hash_tag + "'," + book.location_longitude + ","
                + book.location_latitude + ",'" + book.genre + "','" + book.b_condition + "','" + book.b_action + "'" +
                ",0,NOW(),'" + response + "')";
            connection.query(query
                , function (err, rows) {
                    if (err) {

                        callback(701);
                    }
                    callback(200);
                });
        }
        else {
            callback(701);
        }
    });
}

function getBookInfoById(book, connection, callback) {
    sessionDao.getUserIdBySessionId(book.session_id, connection, function (response) {
        if (response != '_701_') {
            var query = "call sp_getBookById('" + book.book_id + "','" + response + "')";
            connection.query(query
                , function (err, rows) {
                    if (err) {
                        callback(701);
                    }

                    callback(rows[0][0]);
                });
        }
        else {
            callback(701);
        }
    });
}

function getBookInfoByIds(trans_id, connection, callback) {
    var query = "call sp_getBookByIds('" + trans_id + "')";
    connection.query(query
        , function (err, rows) {
            if (err) {
                callback(701);
            }
            callback(rows[0]);
        });

}


function getTopBookByUser(book, connection, callback) {
    sessionDao.getUserIdBySessionId(book.session_id, connection, function (response) {
        if (response != '_701_') {
            var query = "call sp_getTopBookByUser(" + book.top + "," + book.from + "," + response + ")";
            connection.query(query
                , function (err, rows) {
                    if (err) {
                        callback(701);
                    }
                    callback(rows[0]);
                });
        }
        else {
            callback(701);
        }
    });
}

function getTopBook(book, connection, callback) {
    sessionDao.getUserIdBySessionId(book.session_id, connection, function (response) {
        if (response != '_701_') {
            var query = "call sp_GetTopBook(" + book.top + "," + book.from + ")";
            connection.query(query
                , function (err, rows) {
                    if (err) {
                        callback(701);
                    }
                    callback(rows[0]);
                });
        }
        else {
            callback(701);
        }
    });
}


function getAllBookByUserId(session_id, connection, callback) {
    sessionDao.getUserIdBySessionId(session_id, connection, function (response) {
        if (response != '_701_') {
            var query = "call sp_getAllBookByUser(" + response + ")";
            connection.query(query
                , function (err, rows) {
                    if (err) {
                        callback(701);
                    }
                    callback(rows[0]);
                });
        }
        else {
            callback(701);
        }
    });
}

function getAllBook(connection, callback) {
    var query = "call Book_GetAll()";
    connection.query(query
        , function (err, rows) {
            if (err) {
                callback(701);
            }
            callback(rows[0]);
        });
}

function bookTransfer(book, connection, callback) {
    sessionDao.getUserIdBySessionId(book.session_id, connection, function (response) {
        if (response != '_701_') {
            var query = "call sp_bookTransfer(" + book.user_id + ","
                + book.book_id + ")";
            connection.query(query
                , function (err, rows) {
                    if (err) {
                        callback(701);
                    }
                    callback(200);
                });
        }
        else {
            callback(701);
        }
    });
}

function updateBook(book, connection, callback) {
    sessionDao.getUserIdBySessionId(book.session_id, connection, function (response) {
        if (response != '_701_') {
            var query = "call sp_updatebook(" + book.id + ",'"
                + book.title + "','" + book.author + "','"
                + book.photo + "','" + book.hash_tag + "'," + book.location_longitude + ","
                + book.location_latitude + ",'" + book.genre + "','" + book.b_condition + "','" + book.b_action + "'," + book.price + ")";
            connection.query(query
                , function (err, rows) {
                    if (err) {
                        callback(701);
                    }
                    callback(200);
                });
        }
        else {
            callback(701);
        }
    });
}

module.exports.getAllBook = getAllBook;
module.exports.updateBook = updateBook;
module.exports.addBook_ios = addBook_ios;
function Book_Delete(bookid, connection, callback) {
    connection.query("call Book_Delete(" + bookid + ")", function (err, rows) {
        if (err) {
            callback(701);
        }
        else {
            callback(200);
        }
    });
}

function Book_Filter(book, connection, callback) {
    var query = "call Book_Filter('" + (book.bookid ? book.bookid : 'null') + "', '" + (book.title ? book.title : 'null')
        + "', '" + (book.author ? book.author : 'null') + "', '" + (book.photo ? book.photo : 'null') + "', '"
        + (book.hashTag ? book.hashTag : 'null') + "', " + (book.locationLongitude ? book.locationLongitude : 'null') + ", "
        + (book.locationLatitude ? book.locationLatitude : 'null') + ", '" + (book.genre ? book.genre : 'null') + "', '"
        + (book.bookCondition ? book.bookCondition : 'null') + "', '" + (book.action ? book.action : 'null') + "', "
        + (book.isDeleted ? book.isDeleted : 'null' + ", '" + (book.createDate ? book.createDate : 'null') + "', '"
        + (book.userID ? book.userID : 'null') + "', " + (book.price ? book.price : 'null') + ")");
    connection.query(query, function (err, rows) {
        if (err) {
            callback(701);
        }
        else {
            callback(rows[0]);
        }
    });
}

function Book_GetAll(connection, callback) {
    connection.query("call Book_GetAll()", function (err, rows) {
        if (err) {
            callback(701);
        }
        else {
            callback(rows[0]);
        }
    });
}

function Book_GetAllGenre(connection, callback) {
    connection.query("call sp_getAllGenre()", function (err, rows) {
        if (err) {
            callback(701);
        }
        else {
            callback(rows[0]);
        }
    });
}

function Book_GetByAuthor(author, connection, callback) {
    connection.query("call Book_GetByAuthor('" + author + "')", function (err, rows) {
        if (err) {
            callback(701);
        }
        else {
            callback(rows[0]);
        }
    });
}

function Book_GetByDate(fromDate, toDate, connection, callback) {
    var query = "call Book_GetByDate('" + (fromDate ? fromDate : "null") + "', '"
        + (toDate ? toDate : "null") + "')";
    connection.query(query, function (err, rows) {
        if (err) {
            callback(701);
        }
        else {
            callback(rows[0]);
        }
        ;
    });
}

function Book_GetByDeleted(isDeleted, connection, callback) {
    connection.query("call Book_GetByDeleted(" + isDeleted + ")", function (err, rows) {
        if (err) {
            callback(701);
        }
        else {
            callback(rows[0]);
        }
    });
}

function Book_GetByID(bookID, connection, callback) {
    connection.query("call Book_GetById('" + bookID + "')", function (err, rows) {
        if (err) {
            callback(701);
        }
        else {
            callback(rows[0]);
        }
    });
}

function Book_GetByPrice(minPrice, maxPrice, connection, callback) {
    connection.query("call Book_GetByPrice(" + (minPrice ? minPrice : 'null') + ", "
        + (maxPrice ? maxPrice : 'null') + ")", function (err, rows) {
        if (err) {
            callback(701);
        }
        else {
            callback(rows[0]);
        }
    });
}

function Book_GetByTitle(title, connection, callback) {
    connection.query("call Book_GetByTitle('" + title + "')", function (err, rows) {
        if (err) {
            callback(701);
        }
        else {
            callback(rows[0]);
        }
    });
}

function Book_GetByUserID(userID, connection, callback) {
    connection.query("call Book_GetByUser('" + userID + "')", function (err, rows) {
        if (err) {
            callback(701);
        }
        else {
            callback(rows[0]);
        }
    });
}

function Book_GetByUserSession(session_id, connection, callback) {
    sessionDao.getUserIdBySessionId(session_id, connection, function (response) {
        if (response != 701) {
            connection.query("call Book_GetByUser('" + response + "')", function (err, rows) {
                if (err) {
                    callback(701);
                }
                else {
                    callback(rows[0]);
                }
            });
        }
        else
            callback(701);
    });
}

function Book_Insert(book, connection, callback) {
    var query = "call Book_Insert('" + book.bookid + "', '" + book.title + "', '" + book.author + "', '" + book.photo
        + "', '" + book.hashTag + "', " + book.locationLongitude + ", " + book.locationLatitude + ", '" + book.genre
        + "', '" + book.bookCondition + "', '" + book.action + "', " + book.isDeleted + ", '" + book.createDate + "', '"
        + book.userID + "', " + book.price + ")";
    connection.query(query, function (err, rows) {
        if (err) {
            callback(701);
        }
        else {
            callback(rows.affectedRows);
        }
    });
}

function Book_Search(book, connection, callback) {
    var query = "call Book_Search('" + (book.titleKeyword ? book.titleKeyword : 'null') + "', '"
        + (book.authorKeyword ? book.authorKeyword : 'null') + "', '" + (book.hashtagKeyword ? book.hashtagKeyword : 'null')
        + "', '" + (book.photoKeyword ? book.photoKeyword : 'null') + "', '" + (book.genreKeyword ? book.genreKeyword : 'null')
        + "')";
    connection.query(query, function (err, rows) {
        if (err) {
            callback(701);
        }
        else {
            callback(rows[0]);
        }
    });
}

function Book_Update(book, connection, callback) {
    var _isDeleted;
    var query = "call Book_Update('" + book.bookid + "', '" + book.title + "', '" + book.author + "', '" + book.photo
        + "', '" + book.hashTag + "', " + book.locationLongitude + ", " + book.locationLatitude + ", '" + book.genre
        + "', '" + book.bookCondition + "', '" + book.action + "', " + book.isDeleted + ", '" + book.createDate + "', '"
        + book.userID + "', " + book.price + ")";
    connection.query(query, function (err, rows) {
        if (err) {
            callback(701);
        }
        else {
            callback(rows.affectedRows);
        }
    });
}

module.exports.getBookInfoByIds = getBookInfoByIds
module.exports.Book_GetAllGenre = Book_GetAllGenre;
module.exports.bookTransfer = bookTransfer;
module.exports.getTopBookByUser = getTopBookByUser;
module.exports.getTopBook = getTopBook;
module.exports.getAllBookByUserId = getAllBookByUserId;
module.exports.getBookInfoById = getBookInfoById;
module.exports.addBook = addBook;
module.exports.Book_Delete = Book_Delete;
module.exports.Book_Filter = Book_Filter;
module.exports.Book_GetAll = Book_GetAll;
module.exports.Book_GetByAuthor = Book_GetByAuthor;
module.exports.Book_GetByDate = Book_GetByDate;
module.exports.Book_GetByDeleted = Book_GetByDeleted;
module.exports.Book_GetByID = Book_GetByID;
module.exports.Book_GetByPrice = Book_GetByPrice;
module.exports.Book_GetByTitle = Book_GetByTitle;
module.exports.Book_GetByUserID = Book_GetByUserID;
module.exports.Book_GetByUserSession = Book_GetByUserSession;
module.exports.Book_Insert = Book_Insert;
module.exports.Book_Search = Book_Search;
module.exports.Book_Update = Book_Update;