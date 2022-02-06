const router = require('express').Router();
const { getUsers, getSingleUser, createUser, updateUser, deleteUser, addFriend, deleteFriend } = require("../../controllers/userController");

router.route("/").get(getUsers).post(createUser).put(updateUser);
router.route("/:id").get(getSingleUser).delete(deleteUser);
router.route("/:id/friends/:fid").post(addFriend).delete(deleteFriend);

module.exports = router;