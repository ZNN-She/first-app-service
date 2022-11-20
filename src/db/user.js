// modue
const mongoose = require('./db')
const Schema = mongoose.Schema;

const ceshiSchema = new Schema({
  username: String,
  password: String,
});

const UserModel = mongoose.model('User', ceshiSchema);

class Mongodb {
  constructor() {

  }
  // 查询
  query() {
    return new Promise((resolve, reject) => {
      UserModel.find({}, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  }
  // 保存
  save(obj) {
    const m = new UserModel(obj)
    return new Promise((resolve, reject) => {
      m.save((err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
        console.log(res)
      })
    })
  }
}

module.exports = new Mongodb()
