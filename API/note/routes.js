const express = require("express");

const {
  noteFetch,
  updateNote,
  fetchNote,
  deleteNote,
} = require("./controllers");
const router = express.Router();
router.param("notesId", async (req, res, next, noteId) => {
  const note = await fetchNote(noteId, next);
  if (note) {
    req.note = note;
    next();
  } else {
    const error = new Error("note not found");
    error.status = 404;
    next(error);
  }
});

router.get("/", noteFetch);
router.delete("/:noteId", deleteNote);
router.put("/:noteId", updateNote);
module.exports = router;
