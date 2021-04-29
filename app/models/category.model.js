module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("categories", {
        cName: { type: Sequelize.STRING },
        cSlug: { type: Sequelize.STRING },
        cStatus: { type: Sequelize.BOOLEAN, defaultValue: true },
        cDesc: { type: Sequelize.TEXT },
        cImage: { type: Sequelize.STRING },
    });

    return Category;
};