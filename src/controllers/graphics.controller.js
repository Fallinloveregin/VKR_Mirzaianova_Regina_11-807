import { chain, meanBy } from 'lodash';

import db from '../models';

const User = db.user;
const Result = db.result;

function getAverageResult(results) {
  const test = results[0].name;

  if (test === 'iljina') {
    const knowledge = meanBy(results, 'result.knowledge');
    const profession = meanBy(results, 'result.profession');
    const diploma = meanBy(results, 'result.diploma');
    return { knowledge, profession, diploma };
  }

  if (test === 'zamfir') {
    const VM = meanBy(results, 'result.VM');
    const VPM = meanBy(results, 'result.VPM');
    const VOM = meanBy(results, 'result.VOM');
    return { VM, VPM, VOM };
  }

  return meanBy(results, 'result');
}

const average = async (req, res) => {
  const sex = req.query.sex;
  const groups = req.query.groups || [];
  const users = req.query.users || [];
  const tests = req.query.tests || [];

  const userIds =
    users.length > 0
      ? users
      : (
          await User.find({
            ...(groups.length > 0 && { group: { $in: groups } }),
            ...(sex && { sex })
          })
        ).map((user) => user._id.toString());

  const results = await Result.find({
    ...(tests.length > 0 && { name: { $in: tests } }),
    ...(userIds.length > 0 && { user_id: { $in: userIds } })
  });

  const data = chain(results)
    .groupBy('name')
    .mapValues((results) => {
      return chain(results).groupBy('year').mapValues(getAverageResult).value();
    })
    .value();

  return res.send(data);
};

const analytics = async (req, res) => {
  const test = req.query.test;

  if (test === 'zamfir') {
  }

  if (test === 'iljina') {
  }

  const result = await Result.aggregate([
    { $match: { name: test } },
    { $group: { _id: '$year', average: { $avg: '$result' } } }
  ]);
  const map = result.map((r) => ({ year: r._id, value: r.average }));
  res.send(map);
};

export default { average, analytics };
