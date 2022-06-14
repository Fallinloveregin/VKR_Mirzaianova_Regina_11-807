import db from '../models';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const User = db.user;
const Role = db.role;

const signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    name: req.body.name,
    group: req.body.group,
    sex: req.body.sex,
    birth: req.body.birth,
    password: bcrypt.hashSync(req.body.password, 8)
  });
  user.save((err, user) => {
    if (err) {
      return res.status(500).send({ message: err });
    }
    if (req.body.roles) {
      Role.find({ name: { $in: req.body.roles } }, (err, roles) => {
        if (err) {
          return res.status(500).send({ message: err });
        }
        user.roles = roles.map((role) => role._id);
        user.save((err) => {
          if (err) {
            return res.status(500).send({ message: err });
          }
          return res.send({ message: 'Вы были успешно зарегистрированы!' });
        });
      });
    } else {
      Role.findOne({ name: 'user' }, (err, role) => {
        if (err) {
          return res.status(500).send({ message: err });
        }
        user.roles = [role._id];
        user.save((err) => {
          if (err) {
            return res.status(500).send({ message: err });
          }
          return res.send({ message: 'Вы были успешно зарегистрированы!' });
        });
      });
    }
  });
};

const signin = (req, res) => {
  User.findOne({ username: req.body.username })
    .populate('roles', '-__v')
    .exec((err, user) => {
      if (err) return res.status(500).send({ message: err });
      if (!user) return res.status(404).send({ message: 'Неверный логин или пароль' });

      const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) {
        return res.status(401).send({ accessToken: null, message: 'Неверный логин или пароль' });
      }

      const token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: 86400 });
      const authorities = user.roles.map((role) => `ROLE_${role.name.toUpperCase()}`);

      return res.status(200).send({
        id: user._id,
        username: user.username,
        name: user.name,
        group: user.group,
        sex: user.sex,
        birth: user.birth,
        roles: authorities,
        accessToken: token
      });
    });
};

export default { signin, signup };
