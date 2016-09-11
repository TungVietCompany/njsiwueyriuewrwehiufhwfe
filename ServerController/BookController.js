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

function addBook_ios(book,res) {
    bookDao.addBook_ios(book,connection,function (response) {
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

module.exports.getAllBook = getAllBook;
module.exports.updateBook = updateBook;
module.exports.addBook_ios = addBook_ios;
module.exports.getAllBookByUserId = getAllBookByUserId;
module.exports.getBookInfoById = getBookInfoById;
module.exports.addBook = addBook;