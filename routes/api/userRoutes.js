const router = require('express').Router();
const { getUsers, getSingleUser, createUser, updateUser, deleteUser, addFriend, deleteFriend } = require("../../controllers/userController");

router.route("/").get(getUsers).post(createUser).put(updateUser).delete(deleteUser);
router.route("/:id").get(getSingleUser);
router.route("/:id/friends/:fid").post(addFriend).delete(deleteFriend);

module.exports = router;