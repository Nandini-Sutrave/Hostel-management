const Joi = require('joi');

exports.registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('student', 'warden').required(),
  phone: Joi.string().required(),
  gender: Joi.string().valid('Male', 'Female', 'Other').required(),

  profileImage: Joi.string(), // Optional file path as string

  // Student-specific fields
  roomNumber: Joi.string().when('role', {
    is: 'student',
    then: Joi.required(),
    otherwise: Joi.forbidden()
  }),
  block: Joi.string().when('role', {
    is: 'student',
    then: Joi.required(),
    otherwise: Joi.forbidden()
  }),
  semester: Joi.string().when('role', {
    is: 'student',
    then: Joi.required(),
    otherwise: Joi.forbidden()
  }),
  year: Joi.string().when('role', {
    is: 'student',
    then: Joi.required(),
    otherwise: Joi.forbidden()
  }),
  branch: Joi.string().when('role', {
    is: 'student',
    then: Joi.required(),
    otherwise: Joi.forbidden()
  }),
  dateOfBirth: Joi.string().when('role', {
    is: 'student',
    then: Joi.required(),
    otherwise: Joi.forbidden()
  }),
  address: Joi.string().when('role', {
    is: 'student',
    then: Joi.required(),
    otherwise: Joi.forbidden()
  }),
  guardianName: Joi.string().when('role', {
    is: 'student',
    then: Joi.required(),
    otherwise: Joi.forbidden()
  }),
  guardianPhone: Joi.string().when('role', {
    is: 'student',
    then: Joi.required(),
    otherwise: Joi.forbidden()
  }),
  bloodGroup: Joi.string().when('role', {
    is: 'student',
    then: Joi.required(),
    otherwise: Joi.forbidden()
  }),

  // Warden-specific fields
  joiningDate: Joi.string().when('role', {
    is: 'warden',
    then: Joi.required(),
    otherwise: Joi.forbidden()
  }),
  department: Joi.string().when('role', {
    is: 'warden',
    then: Joi.required(),
    otherwise: Joi.forbidden()
  })
});

exports.loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});
