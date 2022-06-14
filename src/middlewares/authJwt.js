import jwt from 'jsonwebtoken';

import db from '../models';

const User = db.user;
const Role = db.role;

const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send({ message: 'Токен отсутствует' });
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Не авторизован!' });
    }
    req.userId = decoded.id;
    return next();
  });
};

const isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      return res.status(500).send({ message: err });
    }
    Role.find({ _id: { $in: user.roles } }, (err, roles) => {
      if (err) {
        return res.status(500).send({ message: err });
      }
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'admin') {
          return next();
        }
      }
      return res.status(403).send({ message: 'Требуются админ права' });
    });
  });
};

export default { verifyToken, isAdmin };
