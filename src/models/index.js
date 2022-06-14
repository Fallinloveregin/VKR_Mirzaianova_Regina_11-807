import mongoose from 'mongoose';
import Role from './role.model';
import User from './user.model';
import Result from './result.model';
import Recommendation from './recommendation.model';

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.user = User;
db.role = Role;
db.result = Result;
db.recommendation = Recommendation;
db.ROLES = ['admin', 'user'];

export default db;
