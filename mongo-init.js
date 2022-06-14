db.createUser({
  user: 'developer',
  pwd: 'P@ssw0rdForDeveloper',
  roles: [
    {
      role: 'readWrite',
      db: 'tests'
    }
  ]
});
