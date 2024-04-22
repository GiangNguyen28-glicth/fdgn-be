db.createUser({
  user: 'giangnt',
  pwd: 'giangntxpower',
  roles: [
    {
      role: 'dbOwner',
      db: 'admin',
    },
  ],
});
