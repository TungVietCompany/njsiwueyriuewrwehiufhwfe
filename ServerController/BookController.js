var connection = require('../DatabaseConnection/MysqlConnection');
var bookDao = require('../DAO/BookDAO');
var sessionDao = require('../DAO/SessionDAO');
var md5 = require('../Library/MD5');
var ResponseData = require('../DAO/ResponseData');
function addBook(book,res) {
    bookDao.addBook(book,connection,function (response) {
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

function updateBook(book,res) {
    bookDao.updateBook(book,connection,function (response) {
        if(response != 701)
        {
            res.json(new ResponseData(200, "Cập nhật thành công", ""));
        }
        else
        {
            res.json(new ResponseData(701, "Cập nhật thất bại", ""));
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

function getTopBookByUser(book,res) {
    bookDao.getTopBookByUser(book,connection,function (response) {
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


function getTopBook(book,res) {
    bookDao.getTopBook(book,connection,function (response) {
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

function getAllBook(res) {
    bookDao.getAllBook(connection,function (response) {
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
            res.json(new ResponseData(200, "Success!", ""));
    });
}

function Book_Filter(book, res){
    bookDao.Book_Filter(book, connection, function(response){
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

function Book_Insert(book, res){
    bookDao.Book_Insert(book, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function Book_Search(book, res){
    bookDao.Book_Search(book, connection, function(response){
        if(response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

function Book_Update(book, res){
    bookDao.Book_Update(book, connection, function(response) {
        if (response == 701)
            res.json(new ResponseData(701, "Error!", ""));
        else
            res.json(response);
    });
}

module.exports.getTopBookByUser = getTopBookByUser;
module.exports.getAllBook = getAllBook;
module.exports.getTopBook = getTopBook;
module.exports.updateBook = updateBook;
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