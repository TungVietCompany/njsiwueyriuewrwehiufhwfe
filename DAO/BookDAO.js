var md5 = require('../Library/MD5');
var sessionDao = require('./SessionDAO');

function addBook(session_id,book,connection,callback) {
    sessionDao.getUserIdBySessionId(session_id,connection,function (response) {
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

function Book_Delete(bookid, connection, callback){
    connection.query("call Book_Delete('" + bookid + "')", function(err, rows){
        if(err){
            callback(701);
        }
        else{
            callback(rows.affectedRows);
        }
    });
}

function Book_Filter(bookid, title, author, photo, hashTag, locationLongitude, locationLatitude,
        genre, bookCondition, action, isDeleted, createDate, userID, price, connection, callback){
    var _isDeleted;
    if(!isDeleted)
        _isDeleted = 'null';
    else if(isDeleted == 0)
        _isDeleted = 'false';
    else
        _isDeleted = 'true';

    var query = "call Book_Filter('" + bookid ? bookid : 'null' + "', '" + title ? title : 'null'
        + "', '" + author ? author : 'null' + "', '" + photo ? photo : 'null' + "', '"
        + hashTag ? hashTag : 'null' + "', " + locationLongitude ? locationLongitude : 'null' + ", "
        + locationLatitude ? locationLatitude : 'null' + ", '" + genre ? genre : 'null' + "', '"
        + bookCondition ? bookCondition : 'null' + "', '" + action ? action : 'null' + "', "
        + _isDeleted + ", '" + createDate ? createDate : 'null' + "', '" + userID ? userID : 'null' + "', "
        + price ? price : 'null' + ")";
    connection.query(query, function(err, rows){
        if(err){
            callback(701);
        }
        else{
            callback(rows[0]);
        }
    });
}

function Book_GetAll(connection, callback){
    connection.query("call Book_GetAll()", function(err, rows){
        if(err){
            callback(701);
        }
        else{
            callback(rows[0]);
        }
    });
}

function Book_GetByAuthor(author, connection, callback){
    connection.query("call Book_GetByAuthor('" + author + "')", function(err, rows){
        if(err){
            callback(701);
        }
        else{
            callback(rows[0]);
        }
    });
}

function Book_GetByDate(fromDate, toDate, connection, callback){
    var query = "call Book_GetByDate('" + (fromDate ? fromDate : "null") + "', '"
        + (toDate ? toDate : "null") + "')";
    connection.query(query, function(err, rows){
        if(err){
            callback(701);
        }
        else{
            callback(rows[0]);
        };
    });
}

function Book_GetByDeleted(isDeleted, connection, callback){
    connection.query("call Book_GetByDeleted(" + isDeleted + ")", function(err, rows){
        if(err){
            callback(701);
        }
        else{
            callback(rows[0]);
        }
    });
}

function Book_GetByID(bookID, connection, callback){
    connection.query("call Book_GetById('" + bookID + "')", function(err, rows){
        if(err){
            callback(701);
        }
        else{
            callback(rows[0]);
        }
    });
}

function Book_GetByPrice(minPrice, maxPrice, connection, callback){
    connection.query("call Book_GetByPrice(" + minPrice ? minPrice : 'null' + ", "
        + maxPrice ? maxPrice : 'null' + ")", function(err, rows){
        if(err){
            callback(701);
        }
        else{
            callback(rows[0]);
        }
    });
}

function Book_GetByTitle(title, connection, callback){
    connection.query("call Book_GetByTitle('" + title + "')", function(err, rows){
        if(err){
            callback(701);
        }
        else{
            callback(rows[0]);
        }
    });
}

function Book_GetByUserID(userID, connection, callback){
    connection.query("call Book_GetByUser('" + userID + "')", function(err, rows){
        if(err){
            callback(701);
        }
        else{
            callback(rows[0]);
        }
    });
}

function Book_GetByUserSession(session_id, connection, callback){
    sessionDao.getUserIdBySessionId(session_id, connection, function(response){
        if(response != 701){
            connection.query("call Book_GetByUser('" + response + "')", function(err, rows){
                if(err){
                    callback(701);
                }
                else{
                    callback(rows[0]);
                }
            });
        }
        else
            callback(701);
    });
}

function Book_Insert(bookid, title, author, photo, hashTag, locationLongitude, locationLatitude,
         genre, bookCondition, action, isDeleted, createDate, userID, price, connection, callback){
    var query = "call Book_Insert('" + bookid + "', '" + title + "', '" + author + "', '" + photo
        + "', '" + hashTag + "', " + locationLongitude + ", " + locationLatitude + ", '" + genre
        + "', '" + bookCondition + "', '" + action + "', " + isDeleted + ", '" + createDate + "', '" + userID
        + "', " + price + ")";
    connection.query(query, function(err, rows){
        if(err){
            callback(701);
        }
        else{
            callback(rows.affectedRows);
        }
    });
}

function Book_Search(titleKeyword, authorKeyword, hashtagKeyword, photoKeyword, genreKeyword, connection, callback){
    var query = "call Book_Search('" + titleKeyword ? titleKeyword : 'null' + "', '"
        + authorKeyword ? authorKeyword : 'null' + "', '" + hashtagKeyword ? hashtagKeyword : 'null' + "', '"
        + photoKeyword ? photoKeyword : 'null' + "', '" + genreKeyword ? genreKeyword : 'null' + "')";
    connection.query(query, function(err, rows){
        if(err){
            callback(701);
        }
        else{
            callback(rows[0]);
        }
    });
}

function Book_Update(bookid, title, author, photo, hashTag, locationLongitude, locationLatitude,
         genre, bookCondition, action, isDeleted, createDate, userID, price, connection, callback){
    var _isDeleted;
    var query = "call Book_Update('" + bookid + "', '" + title + "', '" + author + "', '" + photo
        + "', '" + hashTag + "', " + locationLongitude + ", " + locationLatitude + ", '" + genre
        + "', '" + bookCondition + "', '" + action + "', " + isDeleted + ", '" + createDate + "', '" + userID
        + "', " + price + ")";
    connection.query(query, function(err, rows){
        if(err){
            callback(701);
        }
        else{
            callback(rows.affectedRows);
        }
    });
}

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