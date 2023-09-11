import JobType from "../models/JobTypeMode.js";

export const getJobtype = async (req, res) => {
  try {
    const response = await JobType.findAll({
      attributes: ["id", "uuid", "name"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getJobtypeById = async (req, res) => {
  try {
    const response = await JobType.findOne({
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
export const createJobtype = async (req, res) => {
  const { name } = req.body;
  const validate = await JobType.findOne({
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
    await JobType.create({
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

export const updateJobtypeById = async (req, res) => {
  const { name } = req.body;
  const jobtype = await JobType.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!jobtype) {
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
    await JobType.update(
      {
        name: name,
      },
      {
        where: {
          id: jobtype.id,
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

export const deleteJobtype = async (req, res) => {
  const jobtype = await JobType.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!jobtype)
    return res.status(404).json({
      success: false,
      msg: "Data not found",
    });
  try {
    await JobType.destroy({
      where: {
        id: jobtype.id,
      },
    });
    res.status(200).json({
      success: true,
      msg: "Job Type Deleted",
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
