import { DocumentQuery, Document } from 'mongoose';
import { StringType } from '../../types';

export default class APIFeatures<T extends Document> {
  constructor(public query: DocumentQuery<T[], T>, private queryString: StringType) {
    this.query = query;
    this.queryString = queryString;
  }

  // 1A) FILTERING
  filter(): APIFeatures<T> {
    const queryObj = { ...this.queryString };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach((el) => delete queryObj[el]);

    // 1B) ADVANCE FILTERING
    let queryStr: any = JSON.stringify(queryObj);
    queryStr = JSON.parse(queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match: string) => `$${match}`));

    this.query.find(queryStr);
    return this;
  }

  // 2) SORTING
  sort(): APIFeatures<T> {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join('');
      this.query = this.query.sort(sortBy);
    }
    return this;
  }

  // 3) FIELD LIMITING
  limitFields(): APIFeatures<T> {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      // exclude the __v field
      this.query = this.query.select('-__v');
    }
    return this;
  }

  // 4) PAGINATION
  paginate(size: number): APIFeatures<T> {
    const page = +this.queryString.page || 1;
    const skip = (page - 1) * size;
    // skip: skip results (offset) and limit: number of results per page
    this.query = this.query.skip(skip).limit(size);

    return this;
  }
}
