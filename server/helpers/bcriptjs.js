const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const hashPassword = (payload) => {
  return bcrypt.hashSync(payload, salt);
}

const comparePassword = (passwordInput, hashPassword) => {
  return bcrypt.compareSync(passwordInput, hashPassword);
}

module.exports = {
  hashPassword,
  comparePassword
}