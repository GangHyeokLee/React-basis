const express = require('express');
const app = express();
const port = 5000;

const config=require('./config/key');

const bodyParser = require('body-parser');
const {User} = require("./models/User");

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));
///application/json
app.use(bodyParser.json())

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {}).then(()=>console.log('MongoDB Connected...')).catch(err=>console.log(err));

app.get('/', (req, res) => res.send('ㅎㅇㅎㅇㅎㅇㅎㅇ'));

app.post('/register', async (req, res)=>{

  //회원가입 할 떄 필요한 정보들을 client에서 가져오며
  //그것들을 데이터 베이스에 넣어준다.


  const user = new User(req.body)

  const result = await  user.save().then(()=>{
    res.status(200).json({
        success: true
      })
  }).catch((err)=>{
    res.json({success: false, err})
  })
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));