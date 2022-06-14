import db from './index';
import bcrypt from 'bcryptjs';

const Role = db.role;
const User = db.user;

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({ name: 'user' }).save((err) => {
        if (err) console.log('error', err);
        console.log("added 'user' to roles collection");
      });
      new Role({ name: 'admin' }).save((err) => {
        if (err) console.log('error', err);
        console.log("added 'admin' to roles collection");
      });
    }
  });
  User.findOne({ username: 'admin' }).exec((err, user) => {
    if (err) console.log('error', err);
    if (!user) {
      const admin = new User({
        username: 'admin',
        name: 'Регина Мирзаянова',
        group: '11-807',
        sex: 'Ж',
        birth: '2000-03-21',
        password: bcrypt.hashSync('admin', 8)
      });

      admin.save((err, admin) => {
        if (err) console.log('error', err);

        Role.findOne({ name: 'admin' }, (err, role) => {
          if (err) console.log('error', err);
          admin.roles = [role._id];
          admin.save((err) => {
            if (err) console.log('error', err);
            console.log('admin user created');
          });
        });
      });
    }
  });
}

export function initMongoose() {
  db.mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('Successfully connect to MongoDB.');
      initial();
    })
    .catch((err) => {
      console.error('Connection error', err);
      process.exit();
    });
}
