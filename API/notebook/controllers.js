const { Notebook, Note } = require("../../db/models");

exports.fetchNotebook = async (notebookId, next) => {
  try {
    const notebook = await Notebook.findbyPk(notebookId);
    return notebook;
  } catch (error) {
    next(error);
  }
};

exports.notebookFetch = async (req, res, next) => {
  try {
    const notebooks = await Notebook.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: Note,
        as: "notes",
        attributes: ["id"],
      },
    });
    res.json(notebooks);
  } catch (error) {
    next(error);
  }
};
exports.notebookCreate = async (req, res, next) => {
  try {
    const newNotebook = await Notebook.create(req.body);
    res.status(201).json(newNotebook);
  } catch (error) {
    next(error);
  }
};
