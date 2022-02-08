module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'PostCategories',
    {
      postId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
    },
    { timestamps: false },
  );
