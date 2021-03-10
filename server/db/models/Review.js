const sequelize = require('../index');
const { Model, DataTypes } = require('sequelize');
class Review extends Model {}

Review.init(
    {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5,
            },
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        author_id: {
            type: DataTypes.UUID,
            references: {
                model: 'authors',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        modelName: 'review',
        tableName: 'reviews',
    },
);

module.exports = Review;
