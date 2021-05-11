module.exports = (sequelize, Sequelize) => {
    const Banner = sequelize.define("banners", {
        bName: { type: Sequelize.STRING },
        bSlug: { type: Sequelize.STRING },
        bTitle: { type: Sequelize.STRING },
        bLink: { type: Sequelize.STRING },
        bStatus: { type: Sequelize.BOOLEAN, defaultValue: true },
        bDesc: { type: Sequelize.TEXT },
        bImage: { type: Sequelize.STRING },
    });

    return Banner;
};