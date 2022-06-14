import db from '../models';
import { get } from 'lodash';

const Recommendation = db.recommendation;
const Result = db.result;

const list = (req, res) => {
  Recommendation.find().exec((err, recommendations) => {
    if (err) return res.status(500).send({ message: err });

    return res.status(200).send(recommendations);
  });
};

const user = async (req, res) => {
  const result = await Result.aggregate([
    { $match: { user_id: req.userId } },
    { $sort: { timestamp: -1 } },
    { $group: { _id: '$name', result: { $first: '$$ROOT' } } },
    { $replaceWith: { name: '$_id', result: '$result' } }
  ]);

  const results = result.reduce((acc, v) => ({ ...acc, [v.name]: v.result.result }), {});

  const recommendations = await Recommendation.find();

  const s = recommendations
    .map(({ value }) => {
      const fn = new Function(
        'неудачи',
        'достижения',
        'риск',
        'знания',
        'профессия',
        'диплом',
        'вом',
        'впм',
        'вм',
        value
      );

      return fn(
        get(results, 'elers'),
        get(results, 'elers2'),
        get(results, 'shubert'),
        get(results, 'iljina.knowledge'),
        get(results, 'iljina.profession'),
        get(results, 'iljina.diploma'),
        get(results, 'zamfir.VOM'),
        get(results, 'zamfir.VPM'),
        get(results, 'zamfir.VM')
      );
    })
    .filter(Boolean);

  return res.status(200).send(s);
};

const add = (req, res) => {
  const recommendation = new Recommendation({
    user_id: req.userId,
    name: req.body.name,
    value: req.body.value
  });
  recommendation.save((err, result) => {
    if (err) return res.status(500).send({ message: err });

    return res.status(200).send(result);
  });
};

const edit = (req, res) => {
  Recommendation.findOneAndUpdate(
    { _id: req.body.id },
    { name: req.body.name, value: req.body.value },
    { upsert: false },
    (err, result) => {
      if (err) return res.status(500).send({ message: err });

      return res.status(200).send(result);
    }
  );
};

const remove = (req, res) => {
  Recommendation.deleteOne({ _id: req.body.id }, (err, result) => {
    if (err) return res.status(500).send({ message: err });

    return res.status(200).send(result);
  });
};

export default { list, user, add, edit, remove };
