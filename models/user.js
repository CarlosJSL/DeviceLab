export default (sequelize, DataType) => {
  const Users = sequelize.define(
    'Users', {
      id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          isAlpha: {
            msg: 'O nome só pode conter letras',
          },
        },
      },
      email: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          isEmail: {
            msg: 'O formato do email não está correto!',
          },
        },
      },
      password: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      lastAccess: {
        type: DataType.DATE,
        allowNull: true,
      },
    },
    {
      hooks: {
        afterCreate: (user) => {
          user.lastAccess = new Date()
        },
      },
    },
  )
  return Users
}
