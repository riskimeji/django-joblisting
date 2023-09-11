import Career from "../models/CareerModel.js";

export const getCareer = async (req, res) => {
  try {
    const response = await Career.findAll({
      attributes: ["id", "uuid", "name"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getCareerById = async (req, res) => {
  try {
    const response = await Career.findOne({
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
export const createCareer = async (req, res) => {
  const { name } = req.body;
  const validate = await Career.findOne({
    attributes: ["name"],
    where: {
      name: name,
    },
  });
  if (validate !== null) {
    return res.status(400).json({
      success: false,
      msg: "Data already exist",
    });
  }
  try {
    await Career.create({
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

export const updateCareerById = async (req, res) => {
  const { name } = req.body;
  const career = await Career.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!career) {
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
    await Career.update(
      {
        name: name,
      },
      {
        where: {
          id: career.id,
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

export const deleteCareer = async (req, res) => {
  const career = await Career.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!career)
    return res.status(404).json({
      success: false,
      msg: "Data not found",
    });
  try {
    await Career.destroy({
      where: {
        id: career.id,
      },
    });
    res.status(200).json({
      success: true,
      msg: "Career Deleted",
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
