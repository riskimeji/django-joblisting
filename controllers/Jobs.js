import Job from "../models/JobModel.js";
import User from "../models/UserModel.js";
import Category from "../models/CategoryModel.js";
import Career from "../models/CareerModel.js";
import JobType from "../models/JobTypeMode.js";
import slugify from "voca";
import { Op } from "sequelize";

export const getJob = async (req, res) => {
  try {
    let response;
    const limit = req.query.limit || null; // Mengambil nilai limit dari query parameter, atau null jika tidak ada

    const queryOptions = {
      attributes: [
        "uuid",
        "title",
        "address",
        "est_gaji",
        "description",
        "status",
        "createdAt",
        "updatedAt",
      ],
      include: [
        {
          model: User,
          attributes: ["name", "email"],
        },
        {
          model: Category,
          attributes: ["id", "name"],
        },
        {
          model: Career,
          attributes: ["id", "name"],
        },
        {
          model: JobType,
          attributes: ["id", "name"],
        },
      ],
    };

    if (req.role === "admin") {
      response = await Job.findAll(queryOptions);
    } else {
      queryOptions.where = {
        userId: req.userId,
      };
      response = await Job.findAll(queryOptions);
    }

    // Menerapkan batasan jumlah data jika query parameter 'limit' ada
    if (limit) {
      response = response.slice(0, parseInt(limit, 10));
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getJobById = async (req, res) => {
  try {
    const job = await Job.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!job) return res.status(404).json({ msg: "not found data" });
    let response;
    if (req.role === "admin") {
      response = await Job.findOne({
        attributes: [
          "uuid",
          "title",
          "address",
          "est_gaji",
          "description",
          "status",
          "createdAt",
          "updatedAt",
        ],
        where: {
          id: job.id,
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
          {
            model: Category,
            attributes: ["id", "name"],
          },
          {
            model: Career,
            attributes: ["id", "name"],
          },
          {
            model: JobType,
            attributes: ["id", "name"],
          },
        ],
      });
    } else {
      response = await Job.findOne({
        attributes: [
          "uuid",
          "title",
          "address",
          "est_gaji",
          "description",
          "status",
          "createdAt",
          "updatedAt",
        ],
        where: {
          [Op.and]: [{ id: job.id }, { userId: req.userId }],
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
          {
            model: Category,
            attributes: ["name"],
          },
          {
            model: Career,
            attributes: ["name"],
          },
          {
            model: JobType,
            attributes: ["id", "name"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const createJob = async (req, res) => {
  const {
    title,
    categoryId,
    careerId,
    jobtypeId,
    address,
    est_gaji,
    description,
    status,
  } = req.body;
  try {
    let slug = slugify(req.body.title).toString();
    let status = "aktif";
    await Job.create({
      userId: req.userId,
      title: req.body.title,
      categoryId: req.body.categoryId,
      careerId: req.body.careerId,
      jobtypeId: req.body.jobtypeId,
      address: req.body.address,
      est_gaji: req.body.est_gaji,
      description: req.body.description,
      status: req.body.status,
      slug: slug,
    });
    res.status(200).json({ msg: "job created successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const updateJobById = async (req, res) => {
  try {
    const job = await Job.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!job) return res.status(404).json({ msg: "not found data" });
    const {
      title,
      careerId,
      categoryId,
      jobtypeId,
      address,
      est_gaji,
      description,
      status,
    } = req.body;
    let slug = slugify(req.body.title).toString();

    if (req.role === "admin") {
      await Job.update(
        {
          userId: req.userId,
          title: req.body.title,
          categoryId: req.body.categoryId,
          careerId: req.body.careerId,
          jobtypeId: req.body.jobtypeId,
          address: req.body.address,
          est_gaji: req.body.est_gaji,
          description: req.body.description,
          status: status,
          slug: slug,
        },
        {
          where: {
            id: job.id,
          },
        }
      );
    } else {
      if (req.userId !== job.userId)
        return res.status(403).json({ msg: "access denied" });
      await Job.update(
        {
          userId: req.userId,
          title: req.body.title,
          categoryId: req.body.categoryId,
          careerId: req.body.careerId,
          jobtypeId: req.body.jobtypeId,
          address: req.body.address,
          est_gaji: req.body.est_gaji,
          description: req.body.description,
          status: status,
          slug: slug,
        },
        {
          where: {
            [Op.and]: [{ id: job.id }, { userId: req.userId }],
          },
        }
      );
    }
    res.status(200).json({ msg: "job updated successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!job) return res.status(404).json({ msg: "not found data" });
    const {
      title,
      categoryId,
      careerId,
      jobtypeId,
      address,
      est_gaji,
      description,
      status,
    } = req.body;
    let slug = slugify(req.body.title).toString();

    if (req.role === "admin") {
      await Job.destroy({
        where: {
          id: job.id,
        },
      });
    } else {
      if (req.userId !== job.userId)
        return res.status(403).json({ msg: "access denied" });
      await Job.destroy({
        where: {
          [Op.and]: [{ id: job.id }, { userId: req.userId }],
        },
      });
    }
    res.status(200).json({ msg: "job deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
