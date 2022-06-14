import dayjs from 'dayjs';

import db from '../models';

const Result = db.result;

const result = (req, res) => {
  const dateTime = dayjs(req.body.dateTime);

  const result = new Result({
    user_id: req.userId,
    duration: req.body.duration,
    name: req.body.name,
    result: req.body.result,
    date: dateTime.format('DD/MM/YYYY'),
    year: dateTime.format('YYYY'),
    yearMonth: dateTime.format('MM/YYYY'),
    time: dateTime.format('HH:mm:ss'),
    timestamp: dateTime.unix()
  });

  result.save((err, result) => {
    if (err) return res.status(500).send({ message: err });
    return res.send(result);
  });
};

const overview = async (req, res) => {
  const userId = req.userId;

  const result = await Result.aggregate([
    { $match: { user_id: userId } },
    { $sort: { timestamp: -1 } },
    { $group: { _id: '$name', result: { $first: '$$ROOT' } } },
    { $replaceWith: { name: '$_id', result: '$result' } }
  ]);

  return res.status(200).send(result);
};

export default { result, overview };
