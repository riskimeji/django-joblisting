import JobApplied from "../models/JobAppliedModel.js";
import Users from "../models/UserModel.js";
import Job from "../models/JobModel.js";
import { Op } from "sequelize";

export const getJobApplied = async (req, res) => {
  try {
    let response;
    const queryOptions = {
      attributes: ["id", "uuid", "status", "createdAt", "updatedAt"],
      include: [
        {
          model: Users,
          attributes: ["id", "name", "email"],
        },
        {
          model: Job,
          // attributes: ["id", "name"],
        },
      ],
    };
    if (req.role === "admin") {
      response = await JobApplied.findAll(queryOptions);
    } else {
      queryOptions.where = {
        userId: req.userId,
      };
      response = await JobApplied.findAll(queryOptions);
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createJobApplied = async (req, res) => {
  const { jobId, userId } = req.body;

  try {
    const user = await Users.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        msg: "User not found",
      });
    }

    const existingApplication = await JobApplied.findOne({
      where: {
        userId: userId,
        jobId: jobId,
      },
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        msg: "User already applied for this job",
      });
    }

    const status = "pending";
    await JobApplied.create({
      jobId: jobId,
      userId: userId,
      status: status,
    });

    return res.status(200).json({
      success: true,
      msg: "Job application created successfully",
    });
  } catch (error) {
    console.error("Error creating job application:", error);
    return res.status(500).json({ msg: "Error creating job application" });
  }
};
