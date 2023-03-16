const config = {
  envs: {
    PROD: 'production',
    DEV: 'development',
    TEST: 'test'
  },
  maxSizeUpload: 1024 * 1024, // bytes
  CORS_WHITELISTS: new RegExp(process.env.CORS_WHITELISTS),
  deliveryCharge: 100
};

export { config };
export * from './keys';
