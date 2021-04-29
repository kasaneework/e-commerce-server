const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {

    console.log(req.body);
    // return;
    //-- Save User to Database
    User.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phone: req.body.phone,
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8)
        })
        .then(user => {
            if (req.body.roles) {
                Role.findAll({
                    where: {
                        name: {
                            [Op.or]: req.body.roles
                        }
                    }
                }).then(roles => {
                    user.setRoles(roles).then(() => {
                        res.status(200).send({ data: user, message: "User was registered successfully!" });
                    });
                });
            } else {
                // user role = 1  //--default user if not set
                user.setRoles([1]).then(() => {
                    res.status(200).send({ data: user, message: "User was registered successfully!" });
                });
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.signin = (req, res) => {
    // console.log(`req.body--`, req.body);
    User.findOne({
            where: {
                username: req.body.username,
                status: true //--new
            }
        })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            var authorities = [];
            user.getRoles().then(roles => {
                for (let i = 0; i < roles.length; i++) {
                    authorities.push("ROLE_" + roles[i].name.toUpperCase());
                }
                let _data = {
                    id: user.id,

                    firstname: user.firstname,
                    lastname: user.lastname,
                    phone: user.phone,

                    username: user.username,
                    email: user.email,
                    roles: authorities,
                    accessToken: token
                }
                res.status(200).send({
                    data: _data,
                    message: "User login successfully!"
                });
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};