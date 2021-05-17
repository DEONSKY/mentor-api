import Joi from 'joi';
import models from '../../models';

const create_validation = {
  body: Joi.object({
    dataset_ids: Joi.array()
      .min(1)
      .required()
      .items(Joi.number()),
    title: Joi.string()
      .min(2)
      .max(40)
      .required(),
    description: Joi.string()
      .min(2)
      .max(30)
      .required(),
    permission_read: Joi.boolean()
      .required(),
    permission_write: Joi.boolean()
      .required(),
    permission_delete: Joi.boolean()
      .required(),
  }),
};

//Create
const create = async (req, res, next) => {
  const user_id = req.user.id;
  const {
    error,
    value,
  } = create_validation.body.validate(req.body);
  if (error) {
    return res.send(400, {
      errors: error,
    });
  }

  const dataSets = await models.data_sets.findAll({
    where: {
      id: req.body.dataset_ids,
      user_id
    },
  });

  console.log(dataSets.length)
  console.log(req.body.dataset_ids.length)
  if (dataSets.length===req.body.dataset_ids.length) {
    const application = await models.applications.create(req.body)
    const app=await application.setDatasets(dataSets)
    console.log(app)
    return res.status(201).send({
      application: application.toJSON(),
      app:app
    });
  }

  return res.status(403).send({
    errors: [
      {
        message: 'Application\'s some data set not found or you do not have a permission!',
      },
    ],
  });
};

const detail = async (req, res, next) => {
  const {
    id,
  } = req.params;
  const user_id = req.user.id;

  try {
    const application = await models.applications.findOne({
      where: {
        id,
      },
      include: [{
        model: models.data_sets,
        as: 'data_sets',
        where: {
          user_id,
        },
        required: true,
      }],
    });

    if (application) {
      res.send(application);
    } else {
      res.status(403).send({
        errors: [
          {
            message: 'Application not found or you do not have a permission!',
          },
        ],
      });
    }
  } catch (err) {
    res.status(500).send({
      errors: [
        {
          message: err.message || `Error retrieving application with id= ${id}`,
        },
      ],
    });
  }
};

const update = async (req, res, next) => {
  const {
    id,
  } = req.params;
  const user_id = req.user.id;
  try {
    const application = await models.applications.findOne({
      where: {
        id,
      },
      include: [{
        model: models.data_sets,
        as: 'data_sets',
        where: {
          user_id,
        },
        required: true,
      }],
    });

    if (application) {
      await models.applications.update(req.body, {
        where: {
          id: application.id,
        },
      });
      res.send({
        application: application.toJSON(),
      });
    } else {
      res.status(403).send({
        errors: [
          {
            message: 'Application\'s data set not found or you do not have a permission!',
          },
        ],
      });
    }
  } catch (err) {
    res.status(500).send({
      errors: [
        {
          message: err.message || `Could NOT update application with id= ${id}`,
        },
      ],
    });
  }
};

const deleteById = async (req, res, next) => {
  const {
    id,
  } = req.params;
  const user_id = req.user.id;
  const application = await models.applications.findOne({
    where: {
      id,
    },
    include: [{
      model: models.data_sets,
      as: 'data_sets',
      where: {
        user_id,
      },
      required: true,
    }],
  });

  if (application) {
    await models.applications.destroy({
      where: {
        id,
      },
    });
    res.send({
      message: 'Application was deleted successfully!',
    });
  }
  return res.status(403).send({
    errors: [
      {
        message: 'Application not found or you do not have a permission!',
      },
    ],
  });
};

export default {
  prefix: '/applications',
  inject: (router) => {
    router.post('/', create);
    router.get('/:id', detail);
    router.put('/:id', update);
    router.delete('/:id', deleteById);
  },
};
