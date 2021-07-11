const { Notebook, Note } = require("../../db/models");

exports.fetchNote = async (noteId, next) => {
  try {
    const note = await Note.findByPk(noteId);
    return note;
  } catch (error) {
    next(error);
  }
};

exports.noteFetch = async (req, res, next) => {
  try {
    const note = await Note.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: Note,
        as: "notes",
        attributes: ["id"],
      },
    });
    res.json(note);
  } catch (error) {
    next(error);
  }
};

exports.deleteNote = async (req, res, next) => {
  try {
    await req.note.destroy();
    res.status(204).end(); // NO CONTENT
  } catch (error) {
    next(error);
  }
};
exports.updateNote = async (req, res, next) => {
  try {
    if (req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`;
    const updatedNote = await req.note.update(req.body);
    res.json(updatedNote);
  } catch (error) {
    next(error);
  }
};
