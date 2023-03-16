import { Model, Document, CreateQuery, Query, Aggregate } from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import _ from 'lodash';
import AppError from '../utils/appError';
import APIFeatures from '../utils/apiFeatures';
import { StringType } from '../../types';

function createOne<T extends Document>(model: Model<T>, data: CreateQuery<T>): Promise<T> {
  return model.create(data);
}
/**
 * @param  {Model<T>} model mongoose model
 * @param  {string} id id of the document that is to be updated
 * @param  {CreateQuery<T>} data new updated document data
 * @param  {string} modelName model name
 */
async function updateOne<T extends Document>(
  model: Model<T>,
  id: string,
  data: CreateQuery<T>,
  modelName: string,
  document?: T
): Promise<T> {
  let doc: T;
  if (document) doc = document;
  else doc = await model.findById(id);

  if (!doc) throw new AppError(`${modelName} with that id does not exist`, StatusCodes.NOT_FOUND);

  doc = Object.assign(doc, { ...data });
  await doc.save();

  return doc;
}

/**
 * @param  {Model<T>} model mongoose model
 * @param  {string} id id of the document that is to be replace
 * @param  {CreateQuery<T>} data new updated document data
 * @param  {string} modelName model name
 */
async function replaceOne<T extends Document>(
  model: Model<T>,
  id: string,
  data: CreateQuery<T>,
  modelName: string
): Promise<any> {
  await model.replaceOne({ _id: id as any }, data);
  const doc = await model.findById(id);

  if (!doc) throw new AppError(`${modelName} with that id does not exist`, StatusCodes.NOT_FOUND);

  return doc;
}
/**
 * @param  {Model<T>} model mongoose model
 * @param  {StringType} query query fields object
 * @param {object | string} populate populate query field
 * @returns [data, totalCount, size]
 */
async function getAll<T extends Document>(
  model: Model<T>,
  query: StringType,
  populate?: any
): Promise<[T[], number, number]> {
  const { limit } = query;
  const size = limit && !Number.isNaN(Number(limit)) ? Number(limit) : 40;

  const features = new APIFeatures(model.find(), query).filter().sort().limitFields().paginate(size);
  if (populate) features.query.populate(populate);

  const countOptions = _.omit(query, ['page', 'sort', 'limit', 'fields']);
  const [data, totalCount] = await Promise.all([features.query, model.countDocuments(countOptions as any)]);
  return [data, totalCount, size];
}
/**
 * @param  {Model<T>} model mongoose model
 * @param  {string} id id of the document that is to be fetched
 * @param  {string} modelName model name
 * @param  {string|StringType[]} populateOptions? (Optional) either a string option for populating just one field or array of populate options for populating multiple fields or to advance populate option
 * @param  {string} select? (Optional) select model fields explicity
 * @returns Promise
 */
async function getOneById<T extends Document>(
  model: Model<T>,
  id: string,
  modelName: string,
  populateOptions?: string | StringType[],
  select?: string
): Promise<T> {
  let query = model.findById(id);
  if (populateOptions) query = query.populate(Array.isArray(populateOptions) ? [...populateOptions] : populateOptions);
  if (select) query = query.select(select);

  const doc = await query;

  // const station = await SwapStation.findById(stationId).populate('batteries');
  if (!doc) throw new AppError(`${modelName} with that id not found`, StatusCodes.NOT_FOUND);

  return doc;
}
/**
 * @param  {Model<T>} model mongoose model
 * @param  {any} options query object
 * @param  {string} modelName model name
 * @param  {string|StringType[]} populateOptions? (Optional) either a string option for populating just one field or array of populate options for populating multiple fields or to advance populate option
 * @param  {string} select? (Optional) select model fields explicity
 * @returns Promise
 */
async function getOne<T extends Document>(
  model: Model<T>,
  options: any,
  modelName: string,
  populateOptions?: string | StringType[],
  select?: string
): Promise<T> {
  let query = model.findOne(options);
  if (populateOptions) query = query.populate(Array.isArray(populateOptions) ? [...populateOptions] : populateOptions);
  if (select) query = query.select('+apiKey');

  const doc = await query;

  // const station = await SwapStation.findById(stationId).populate('batteries');
  if (!doc) throw new AppError(`${modelName} with that id not found`, StatusCodes.NOT_FOUND);

  return doc;
}
/**
 * @param  {Model<T>} model mongoose model
 * @param  {any} options conditions object
 * @param  {CreateQuery<T>} data updated document data
 * @param  {string} modelName model name
 * @returns Promise
 */
async function updateByFields<T extends Document>(
  model: Model<T>,
  options: any,
  data: CreateQuery<T>,
  modelName: string
): Promise<T> {
  let doc = await model.findOne(options);

  if (!doc) throw new AppError(`${modelName} with that id does not exist`, StatusCodes.NOT_FOUND);

  doc = Object.assign(doc, { ...data });
  await doc.save();
  return doc;
}

/**
 * @param  {Model<T>} model
 * @param  {} options={}
 * @returns Query
 */
function count<T extends Document>(model: Model<T>, options = {}): Query<number> {
  return model.countDocuments(options);
}

function deleteOne<T extends Document>(model: Model<T>, _id: string): Query<any> {
  return model.deleteOne({ _id } as any);
}

function aggregate<T extends Document>(model: Model<T>, option: any[]): Aggregate<any[]> {
  return model.aggregate(option);
}

export default {
  createOne,
  updateOne,
  updateByFields,
  replaceOne,
  getAll,
  getOneById,
  getOne,
  deleteOne,
  count,
  aggregate
};
