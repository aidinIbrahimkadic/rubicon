const getTags = require("../functions/getTagsMethods");

const getTagsController = async (req, res) => {
  const tags = await getTags().then((result) => {
    return result;
  });

  let tagArr = [];
  tags.forEach((t) => {
    tagArr.push(t.tag_name);
  });
  res.send({ tags: tagArr });
};

module.exports = getTagsController;
