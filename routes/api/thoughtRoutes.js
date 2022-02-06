const router = require('express').Router();
const { getThoughts, getSingleThought, createThought, updateThought, deleteThought, addReaction, deleteReaction } = require("../../controllers/thoughtController");

router.route("/").get(getThoughts).post(createThought);
router.route("/:id").get(getSingleThought).delete(deleteThought).put(updateThought);
router.route("/:id/reactions").post(addReaction).delete(deleteReaction);


module.exports = router;