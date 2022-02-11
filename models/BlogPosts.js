module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'BlogPosts',
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      published: new Date(),
      updated: new Date(),
    },
  );
