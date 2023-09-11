import Category from "../models/CategoryModel.js";
import User from "../models/UserModel.js";

export const getCategory = async (req, res) => {
  try {
    const response = await Category.findAll({
      attributes: ["id", "uuid", "name"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const response = await Category.findOne({
      attributes: ["id", "uuid", "name"],
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const createCategory = async (req, res) => {
  const { name } = req.body;
  const validate = await Category.findOne({
    attributes: ["name"],
    where: {
      name: name,
    },
  });
  if (validate !== null) {
    return res.status(400).json({
      success: false,
      msg: "data already exist",
    });
  }
  try {
    await Category.create({
      name: name,
    });
    res.status(200).json({
      success: true,
      msg: "Data Created Successfully",
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateCategoryById = async (req, res) => {
  const { name } = req.body;
  const category = await Category.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!category) {
    return res.status(404).json({
      status: false,
      msg: "Data Not Found",
    });
  }

  if (!name) {
    return res.status(400).json({
      status: false,
      msg: "Name Can't be null",
    });
  }
  try {
    await Category.update(
      {
        name: name,
      },
      {
        where: {
          id: category.id,
        },
      }
    );
    res.status(200).json({
      success: true,
      msg: "Successfully Updated",
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  const category = await Category.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!category)
    return res.status(404).json({
      success: false,
      msg: "Data not found",
    });
  try {
    await Category.destroy({
      where: {
        id: category.id,
      },
    });
    res.status(200).json({
      success: true,
      msg: "Category Deleted",
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
