const mongoose = require('mongoose');
const bycrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50
  },
  email: {
    type: String,
    trim: true,
    unique: 1
  }
  , password: {
    type: String,
    minlength: 5
  },
  lastname: {
    type: String,
    maxlength: 50
  },
  role: {
    type: Number,
    default: 0
  },
  image: String,
  token: {
    type: String
  },
  tokenExp: {
    type: Number
  }
});

userSchema.pre('save', function (next) {
  let user = this;
  if (user.isModified('password')) {
    //비밀번호를 암호화 시킨다 by salt
    // 먼저 salt 생성, salt rounds: salt가 몇 글자인지 설정
    bycrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bycrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);

        // console.log(hash);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }

})

userSchema.methods.comparePassword = function (plainPassword, cb) {
  // plainPassword 1234567  암호화된 비밀번호  ~~~~ 같은지 확인해야됨
  // => plainPassword를 암호화해서 DB거랑 같은지 비교
  bycrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch)
  })

}

userSchema.methods.generateToken = function (cb) {

  let user = this;

  //jsonwebtoken을 이용해서 token을 생성하기
  let token = jwt.sign(user._id.toHexString(), 'secretToken');
  this.token = token;

  user.save().then((user) => {
    cb(null, user);
  })
    .catch((err) => {
      cb(err);
    })


}

userSchema.statics.findByToken = function (token, cb) {
  var user = this;

  // 토큰을  decode 한다.
  jwt.verify(token, 'secretToken', function (err, decoded) {
    // 유저 아이디를 이용해서 유저를 찾은 다음에 
    // 클라이언트에서 가져온 토큰과 DB에서 보관된 token이 일치하는 지 확인

    user.findOne({ "_id": decoded, "token": token })
      .then((user) => {
        cb(null, user);
      })
      .catch((err) => {
        cb(err);
      })

  })
}

const User = mongoose.model('User', userSchema);

module.exports = { User };
