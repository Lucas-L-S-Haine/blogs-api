module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'Categories',
    { name: DataTypes.STRING },
    { timestamps: false },
  );
