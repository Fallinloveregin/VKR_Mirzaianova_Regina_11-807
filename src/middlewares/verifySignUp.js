import db from '../models';

const ROLES = db.ROLES;
const User = db.user;

const checkDuplicateUsername = (req, res, next) => {
  User.findOne({ username: req.body.username }).exec((err, user) => {
    if (err) {
      return res.status(500).send({ message: err });
    }
    if (user) {
      return res.status(400).send({ message: 'Пользователь с таким логином уже существует' });
    }
    next();
  });
};

const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res.status(400).send({ message: `Ошибка! Такой роли не существует` });
      }
    }
  }
  next();
};

export default { checkDuplicateUsername, checkRolesExisted };
