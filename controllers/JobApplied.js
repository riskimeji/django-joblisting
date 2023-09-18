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
        message: " You have already applied for this job",
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

export const updateJobApplied = async (req, res) => {
  try {
    const jobApplied = await JobApplied.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!jobApplied) return res.status(404).json({ msg: "not found data" });
    const {
      status,
      userId,
      jobId,
      jobtypeId,
      address,
      est_gaji,
      description,
      slug,
    } = req.body;

    if (req.role === "admin") {
      await JobApplied.update(
        {
          status: req.body.status,
        },
        {
          where: {
            id: jobApplied.id,
          },
        }
      );
    } else {
      return res.status(403).json({ msg: "access denied" });
    }
    res.status(200).json({ msg: "job updated successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const jobApplied = await JobApplied.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!jobApplied) return res.status(404).json({ msg: "not found data" });
    const { status, userId, jobId } = req.body;

    if (req.role === "admin") {
      await jobApplied.destroy({
        where: {
          id: jobApplied.id,
        },
      });
    } else {
      return res.status(403).json({ msg: "access denied" });
    }
    res.status(200).json({ msg: "job deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
