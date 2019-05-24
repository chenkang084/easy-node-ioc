declare var process: {
  env: {
    NODE_ENV: string;
  };
};

const env = process.env['NODE_ENV'] || 'production';

const logger = {
  error: (...args: any[]) => {
    console.error.apply(console, args);
  },
  info: (...args: any[]) => {
    if (env === 'development') {
      args.unshift('logger:');
      console.info.apply(console, args);
    }
  }
};

export default logger;
