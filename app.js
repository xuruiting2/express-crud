var express = require('express')
var fs = require('fs')
var app = express()
app.use('/node_modules/',express.static('./node_modules/'))
app.use('/public/',express.static('./public/'))
app.engine('html',require('express-art-template'))

app.get('/',function(req,res){
    // 第二个参数是可选的，传入utf8就是告诉它把读取到的文件直接按照utf8编码
    fs.readFile('./db.json','utf-8',function(err,data){
        if(err){
            return res.status(500).send('Server error')
        }
        res.render("index.html",{
            fruits:[
                '苹果',
                '香蕉',
                '橘子'
            ],
            // 从文件中读取到的数据一定是字符串
            // 所以一定要手动转成对象
            students:JSON.parse(data).students
        })
    })
 
})

app.listen(3000,function(){
    console.log("running")
})