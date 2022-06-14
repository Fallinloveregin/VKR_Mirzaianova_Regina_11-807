import db from '../models';

const User = db.user;

const me = (req, res) => {
  User.findById(req.userId)
    .populate('roles', '-__v')
    .exec((err, user) => {
      if (err) return res.status(500).send({ message: err });
      if (!user) return res.status(404).send({ message: 'Пользователь не найден' });

      const authorities = user.roles.map((role) => `ROLE_${role.name.toUpperCase()}`);

      return res.status(200).send({
        id: user._id,
        username: user.username,
        name: user.name,
        group: user.group,
        sex: user.sex,
        birth: user.birth,
        roles: authorities
      });
    });
};

export default { me };
