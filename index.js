var express = require('express')
var app = express()
var dbFun = require('./serverConfig/dbFunction.js')
var Time = require('silly-datetime');
var bodyParser = require('body-parser');
var http = require('http');

app.all('*', function (req, res, next) {
  let origin = req.headers.origin;
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.use(bodyParser()); //数据JSON类型
app.use(bodyParser.urlencoded({ extended: false })); //解析post请求数据

app.use(function (req, res, next) {
  console.log("Middle1")
  next();
})
//获取表
app.get('/test', function (req, res) {
  dbFun.GetData(req, res, dbFun.sqlSentence.selectTb, '', '表');
})
//获取企业
app.get('/company', function (req, res) {
  dbFun.GetData(req, res, dbFun.sqlSentence.selectCompany, '', '企业');
})
//删除单挑数据
app.post('/delectCompany', function (req, res) {
  var deleArr = []
  var companycode = []
  var str
  console.log(req.query)
  if (!req.query)
  {
    console.log('无数据')
  } else
  {
    for (i in req.query)
    {
      deleArr.push(JSON.parse(req.query[i]))
    }
    for (i in deleArr)
    {
      companycode.push(`'${deleArr[i].CompanyCode}'`)
    }
    str = companycode.join()
  }
  var sql = `delete from Ieb_Company where CompanyCode in (${str})`
  dbFun.delectData(req, res, sql)
})


app.use(function (req, res) {
  console.log('404 Not Found');
  res.status(404).json('Not Found');
})



// process.on('uncaughtException', function (err) {
//   var ErrTime = Time.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
//   console.log(ErrTime + ' :Caught exception: ' + err);
// });

http.createServer(app).listen(9567);

console.log('open http://localhost:9567');
// module.exports = app;