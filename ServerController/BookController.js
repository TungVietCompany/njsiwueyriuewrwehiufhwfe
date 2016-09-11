var connection = require('../DatabaseConnection/MysqlConnection');
var bookDao = require('../DAO/BookDAO');
var sessionDao = require('../DAO/SessionDAO');
var md5 = require('../Library/MD5');
var ResponseData = require('../DAO/ResponseData');
function addBook(session_id,book,res) {
    bookDao.addBook(session_id,book,connection,function (response) {
        if(response != 701)
        {
            res.json(new ResponseData(200, "Thêm mới thành công", ""));
        }
        else
        {
            res.json(new ResponseData(701, "Thêm mới thất bại", ""));
        }
    });
}

function getBookInfoById(book,res) {
    bookDao.getBookInfoById(book,connection,function (response) {
        if(response != 701)
        {
            var listBook = [];
            listBook.push(response);
            res.json({code: 200, book: listBook});
        }
        else
        {
            res.json(new ResponseData(701, "Không tồn tại book cần tìm", ""));
        }
    });
}

function getAllBookByUserId(session_id,res) {
    bookDao.getAllBookByUserId(session_id,connection,function (response) {
        if(response != 701)
        {
            var listBook = [];
            var i = 0;
            for(i = 0;i<response.length;i++)
            {
                listBook.push(response[i]);
            }
            res.json({code: 200, book: listBook});
        }
        else
        {
            res.json(new ResponseData(701, "Không tồn tại book cần tìm", ""));
        }
    });
}

//DungNS 11-9-2016

function Book_Delete(bookid, res){
    bookDao.Book_Delete(bookid, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function Book_Filter(bookid, title, author, photo, hashTag, locationLongitude, locationLatitude,
    genre, bookCondition, action, isDeleted, createDate, userID, price, res){
    bookDao.Book_Filter(bookid, title, author, photo, hashTag, locationLongitude, locationLatitude,
        genre, bookCondition, action, isDeleted, createDate, userID, price, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function Book_GetAll(res){
    bookDao.Book_GetAll(connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function Book_GetByAuthor(author, res){
    bookDao.Book_GetByAuthor(author, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function Book_GetByDate(fromDate, toDate, res){
    bookDao.Book_GetByDate(fromDate, toDate, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function Book_GetByDeleted(isDeleted, res){
    bookDao.Book_GetByDeleted(isDeleted, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function Book_GetByID(bookID, res){
    bookDao.Book_GetByID(bookID, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function Book_GetByPrice(minPrice, maxPrice, res){
    bookDao.Book_GetByPrice(minPrice, maxPrice, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function Book_GetByTitle(title, res){
    bookDao.Book_GetByTitle(title, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function Book_GetByUserID(userID, res){
    bookDao.Book_GetByUserID(userID, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function Book_GetByUserSession(session_id, res){
    bookDao.Book_GetByUserSession(session_id, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function Book_Insert(bookid, title, author, photo, hashTag, locationLongitude, locationLatitude,
        genre, bookCondition, action, isDeleted, createDate, userID, price, res){
    bookDao.Book_Insert(bookid, title, author, photo, hashTag, locationLongitude, locationLatitude,
        genre, bookCondition, action, isDeleted, createDate, userID, connection, function(response){
            if(response == 701)
                res.json(new ResponseData(701, "Error!", ""));
            else
                res.json(response);
        });
}

function Book_Search(titleKeyword, authorKeyword, hashtagKeyword, photoKeyword, genreKeyword, res){
    bookDao.Book_Search(titleKeyword, authorKeyword, hashtagKeyword, photoKeyword, genreKeyword,
            price, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function Book_Update(bookid, title, author, photo, hashTag, locationLongitude, locationLatitude,
        genre, bookCondition, action, isDeleted, createDate, userID, price, res){
    bookDao.Book_Update(bookid, title, author, photo, hashTag, locationLongitude, locationLatitude,
            genre, bookCondition, action, isDeleted, createDate, userID, price, connection, function(response) {
        if (response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
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