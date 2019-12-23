var db = require('./connect.js');
var Time = require('silly-datetime');

module.exports = {
  GetData: function (req, res, sql, MiddleFun, msg) {
    // console.time(msg + "执行时间");
    db.sql(sql, function (err, result) {
      if (err)
      {
        console.log(err);
      }
      if (result.recordset.length <= 0)//
      {

        res.json("数据为空");
      } else
      {
        if (MiddleFun == '')
        {
          res.json(result.recordset);
        } else
        {
          res.json(MiddleFun(result.recordset));
        }
      }
      // console.timeEnd(msg + "执行时间");
      console.log(Time.format(new Date(), 'YYYY-MM-DD HH:mm:ss') + ":" + msg + "数据查询完成")
    });
  },
  ResPostData: function (req, res) {
    res.json(req.body);
    res.json('成功');
  },
  delectData: function (req, res, sql) {

    db.sql(sql, function (err, result) {
      if (err)
      {
        console.error(err);
        res.status(500).send('database error').end();
      }
      res.send("删除成功")
    });
  },
  sqlSentence: {
    selectTb: `select * from Sys_Menu`,
    selectCompany: `select * from Ieb_Company`
  }
}