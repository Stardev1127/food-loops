import mongoose, { HookNextFunction } from 'mongoose';
import Joi from 'joi';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import IStaff from '../interfaces/IStaff';
import { ROLES } from '../../constants';
import { keys } from '../../config';

const staffSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name']
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      trim: true,
      // eslint-disable-next-line no-useless-escape
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
    },
    countryCode: {
      type: String,
      required: [true, 'Please provide a country code'],
      default: '+977'
    },
    phoneNumber: {
      type: String,
      required: [true, 'Please provide a phone number'],
      unique: [true, 'Staff with the phone number already exists'],
      minlength: [10, 'Please enter 10 digit number'],
      maxlength: [10, 'Please enter 10 digit number']
    },
    role: {
      type: String,
      required: [true, 'Please assign a role'],
      enum: [ROLES.admin, ROLES.staff]
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 8,
      select: false
    },
    createdAt: {
      type: Date,
      default: Date.now,
      select: false
    },
    passwordChangedAt: Date,
    enabled: {
      type: Boolean,
      default: true,
      select: false
    },
    photo: {
      type: String
    }
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  }
);

staffSchema.pre<IStaff>('save', async function (next: HookNextFunction) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

staffSchema.pre<IStaff>('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  // Setting in database can be bit slower than issuing a jwt
  // Hence passwordChangedAt timestamp is set sometime a bit after then jwt is issued
  // Which will prevent access to the user thinking a password has been updated
  // Hence - 5000
  this.passwordChangedAt = Date.now() - 5000;
  next();
});

staffSchema.methods.validatePassword = async function (candidatePassword: string, userPassword: string) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Check if user changed password after the token was issued
staffSchema.methods.changedPasswordAfter = function (JWTTimestamp: number) {
  if (this.passwordChangedAt) {
    // converting millisecond into seconds
    const changedTimestamp = this.passwordChangedAt.getTime() / 1000;

    return JWTTimestamp < changedTimestamp;
  }

  // false means not changed
  return false;
};

staffSchema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this._id }, keys.JWT_SECRET, {
    expiresIn: keys.JWT_EXPIRES_IN
  });
};

const Staff = mongoose.model<IStaff>('Staff', staffSchema);

export const _staffSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  password: Joi.string().required(),
  roles: Joi.array().required()
}).unknown(true);

export default Staff;
