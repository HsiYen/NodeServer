var mssql = require('mssql');
var config = require('./config.js');
var db = {};

//执行sql,返回数据.
db.sql = function (sql, callBack) {
  var connection = new mssql.ConnectionPool(config, function (err) {
    if (err)
    {
      console.log("数据库连接失败" + err);
      return;
    }
    var ps = new mssql.PreparedStatement(connection);
    ps.prepare(sql, function (err) {
      if (err)
      {
        console.log(err);
        return;
      }
      ps.execute('', function (err, result) {
        if (err)
        {
          console.log(err);
          return;
        }
        ps.unprepare(function (err) {
          if (err)
          {
            console.log(err);
            callback(err, null);
            return;
          }
          callBack(err, result);
        });
      });
    });
  });
};
module.exports = db;