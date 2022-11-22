import Joi from "joi";
import { getDB } from "*/config/mongodb";
import { ObjectID } from "mongodb";

// Define Column collection
const columnCollectionName = "columns";
const columnCollectionSchema = Joi.object({
  boardId: Joi.string().required(),
  title: Joi.string().required().min(3).max(20).trim(),
  cardOrder: Joi.array().items(Joi.string()).default([]),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
  return await columnCollectionSchema.validateAsync(data, {
    abortEarly: false,
  });
};

const createNew = async (data) => {
  try {
    const validatedValue = await validateSchema(data);
    const insertValue = {
      ...validatedValue,
      boardId: ObjectID(validatedValue.boardId),
    };

    const result = await getDB()
      .collection(columnCollectionName)
      .insertOne(insertValue);

    return result.ops[0];
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * @param {string} columnId
 * @param {string} cardId
 */
const pushCardOrder = async (columnId, cardId) => {
  try {
    const result = await getDB()
      .collection(columnCollectionName)
      .findOneAndUpdate(
        { _id: ObjectID(columnId) },
        { $push: { cardOrder: cardId } },
        { returnOriginal: false }
      );

    return result.value;
  } catch (error) {
    throw new Error(error);
  }
};

const update = async (id, data) => {
  try {
    const updateData = {
      ...data,
    };

    if (data.boardId) {
      updateData.boardId = ObjectID(data.boardId);
    }

    const result = await getDB()
      .collection(columnCollectionName)
      .findOneAndUpdate(
        {
          _id: ObjectID(id),
        },
        { $set: updateData },
        { returnOriginal: false }
      );
    console.log(result);
    return result.value;
  } catch (error) {
    throw new Error(error);
  }
};

export const ColumnModel = {
  columnCollectionName,
  createNew,
  update,
  pushCardOrder,
};
