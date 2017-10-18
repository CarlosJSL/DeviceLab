export default {
  database: 'devlab',
  username: '',
  password: '',
  params: {
    dialect: 'sqlite',
    storage: 'devlab.sqlite',
    define: {
      underscored: true,
    },
  },
  jwtSecret: 'Libr##',
  jwtSession: { session: false },
}
