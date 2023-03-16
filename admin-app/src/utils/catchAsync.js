/**
 * Async error wrapper HOF. Catches error and executes error callback function if present.
 * @param  {()=>Promise<void>} fn callback function to execute
 * @param  {(error:string)=>void} errorCallback? (Optional) callback function to execute when error is caught
 * @returns void
 */
const catchAsync = (fn, errorCallback) => {
  return fn().catch((error) => {
    if (errorCallback) {
      const errorMessage = error.response
        ? error.response.data.message
        : 'Internal server error';
      errorCallback(errorMessage);
    }
  });
};

export default catchAsync;
