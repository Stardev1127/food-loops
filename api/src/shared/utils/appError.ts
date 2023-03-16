class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;

  // External error properties
  path: string;
  errors: any[];
  value: string;
  kind: string;
  field: string;
  code: number | string;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    // setting a flag so that we can know the error is created using this class
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
export default AppError;
