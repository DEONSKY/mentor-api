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

  //Find all datasets
  const dataSets = await models.data_sets.findAll({
    where: {
      id: req.body.dataset_ids,
      user_id
    },
  });

  //If all given datasets available
  if (dataSets.length===req.body.dataset_ids.length) {
    //Prepare dataset ids array seqeulize for create process.
    req.body.application_datasets=req.body.dataset_ids.map(di=>({dataset_id:di}))
    try{
      //Create application with dataset connections
      const application = await models.applications.create(req.body,{
        include: [{
          model:models.application_datasets
        }]
      })
      //After create send data for debug. At live it is not required
      return res.status(201).send({
        application: application.toJSON()
      });
    }catch (err) {
      res.status(500).send({
        errors: [
          {
            message: err.message || `Error retrieving application with id= ${id}`,
          },
        ],
      });
    }
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


const list = async (req, res, next) => {

  try {
    const application = await models.applications.findAndCountAll({
     include: [{
        model: models.application_datasets,
        as: 'application_datasets',
        attributes:['id'],
        include:[{
          model:models.data_sets,
          attributes:['id','title','data_type']
        }]
      }],
    });

    if (application) {
      res.send({
        results: application.rows,
        count: application.count,
      });
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

const update_validation = {
  body: Joi.object({
    title: Joi.string()
      .min(2)
      .max(40),
    description: Joi.string()
      .min(2)
      .max(30),
    permission_read: Joi.boolean(),
    permission_write: Joi.boolean(),
    permission_delete: Joi.boolean(),
  }),
};

const update = async (req, res, next) => {
  const {
    id,
  } = req.params;

  const {
    error,
    value,
  } = update_validation.body.validate(req.body);
  if (error) {
    return res.send(400, {
      errors: error,
    });
  }

  try {
    const application = await models.applications.findOne({
      where: {
        id,
      }
    });
    if (application) {
      await models.applications.update(req.body, {
        where: {
          id: application.id,
        },
      });
      res.status(200).send({
        message: `Id= ${id} was updated succesfully`,
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
  
  //Find only applicaition. Because cascade not working correctly due to one is paranoid the other is not
  const application = await models.applications.findOne({
    where: {
      id,
    },
  });

  if (application) {
    //Destroy application dataset connections
    await models.application_datasets.destroy({
      where:{
        application_id:id
      }
    })
    //Destroy application in paranoid way
    const values = await models.applications.destroy({
      where: {
        id,
      },
    });
    res.send({
      message: 'Application was deleted successfully!',
    });
    console.log(values)
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
    router.get('/', list);
    router.get('/:id', detail);
    router.put('/:id', update);
    router.delete('/:id', deleteById);
  },
};
