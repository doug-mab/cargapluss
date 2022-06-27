'use strict';
import bcrypt from 'bcryptjs';
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';

export default (sequelize: Sequelize) => {
  class User extends Model<
    InferAttributes<User>,
    InferCreationAttributes<User>
  > {
    declare email: string;
    declare password_hash: string;
    declare password: string;
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password_hash: {
        type: DataTypes.STRING,
        defaultValue: '',
      },
      password: {
        type: DataTypes.VIRTUAL,
        defaultValue: '',
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
    },
  );

  User.addHook('beforeSave', async (user: User) => {
    if (user.password) {
      user.password_hash = await bcrypt.hash(user.password, 8);
    }
  });

  return User;
};
