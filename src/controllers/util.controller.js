import db from '../models';

const User = db.user;

const groups = (req, res) => {
  User.distinct('group', undefined, (err, groups) => {
    if (err) return res.status(500).send({ message: err });

    return res.status(200).send(groups.sort());
  });
};

const users = (req, res) => {
  const groups = req.query.groups || [];
  const sex = req.query.sex;

  User.find({
    ...(groups.length > 0 && { group: { $in: groups } }),
    ...(sex && { sex })
  }).exec((err, users) => {
    if (err) return res.status(500).send({ message: err });

    return res.status(200).send(users.map((v) => ({ id: v.id, name: v.name })));
  });
};

export default { groups, users };
