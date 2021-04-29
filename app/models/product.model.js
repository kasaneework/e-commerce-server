module.exports = (sequelize, Sequelize) => {

    const Product = sequelize.define("products", {
        pName: { type: Sequelize.STRING },
        pSlug: { type: Sequelize.STRING },
        pStatus: { type: Sequelize.BOOLEAN, defaultValue: true },
        pCategory: { type: Sequelize.INTEGER },
        pQty: { type: Sequelize.INTEGER },
        pPrice: { type: Sequelize.INTEGER },
        pPriceSale: { type: Sequelize.INTEGER },
        pDesc: { type: Sequelize.TEXT },

        pSize: { type: Sequelize.TEXT },
        pColor: { type: Sequelize.TEXT },
        pStar: { type: Sequelize.INTEGER },
        pImageDefault: { type: Sequelize.STRING },
        pImages: { type: Sequelize.TEXT },
        pSpecification: { type: Sequelize.STRING }
    });

    return Product;
};