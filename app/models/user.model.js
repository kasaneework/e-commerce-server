module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        firstname: { type: Sequelize.STRING },
        lastname: { type: Sequelize.STRING },
        phone: { type: Sequelize.STRING },
        username: { type: Sequelize.STRING },
        email: { type: Sequelize.STRING },
        status: { type: Sequelize.BOOLEAN, defaultValue: false },
        password: { type: Sequelize.STRING }
    });
    return User;
};