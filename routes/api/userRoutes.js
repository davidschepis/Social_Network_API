const router = require('express').Router();
const { getUsers, getSingleUser, createUser, updateUser, deleteUser } = require("../../controllers/userController");

router.route("/").get(getUsers).post(createUser).put(updateUser).delete(deleteUser);
router.route("/:id").get(getSingleUser);

module.exports = router;