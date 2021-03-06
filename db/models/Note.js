const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define("Note", {
    name: { type: DataTypes.STRING },
    content: { type: DataTypes.STRING },
    slug: { type: DataTypes.STRING, unique: true },
  });
  SequelizeSlugify.slugifyModel(Note, { source: ["name"] });
  return Note;
};
