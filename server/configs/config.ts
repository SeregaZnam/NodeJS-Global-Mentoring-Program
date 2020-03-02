import convict from 'convict';

const config = convict({
   env: {
      doc: 'The application environment',
      format: ['production', 'development'],
      default: 'development',
      env: 'NODE_ENV'
   },
   port: {
      doc: 'The port to bind.',
      format: 'port',
      default: 3000,
      env: 'PORT',
      arg: 'port'
   },
   logging_level: {
      doc: 'The logging level to print to the console',
      format: ['fatal', 'error', 'warn', 'info', 'debug', 'trace'],
      default: 'info',
      env: 'LOGGING_LEVEL'
   },
   db: {
      host: {
         doc: 'Database host name/IP',
         format: '*',
         default: 'ec2-107-20-241-234.compute-1.amazonaws.com',
         env: 'DB_HOST'
      },
      database: {
         doc: 'Database name',
         format: String,
         default: 'd6omdicjjeh8hd',
         env: 'DB_DATABASE'
      },
      user: {
         doc: 'Database user',
         format: String,
         default: 'csawfyipsxdhtt',
         env: 'DB_USER'
      },
      password: {
         doc: 'Database password',
         format: String,
         default: '190fff0a1e6257b8969421546b2f57c52b80d81b219a6f394948d25c0f37cc5a',
         env: 'DB_PASSWORD'
      },
      uri: {
         doc: 'Database uri',
         format: String,
         default: 'postgres://csawfyipsxdhtt:190fff0a1e6257b8969421546b2f57c52b80d81b219a6f394948d25c0f37cc5a@ec2-107-20-241-234.compute-1.amazonaws.com:5432/d6omdicjjeh8hd',
         env: 'DB_URI'
      },
      port: {
         doc: 'Database port',
         format: 'port',
         default: 5432,
         env: 'DB_PORT'
      }
   },
   jwt: {
      secretKey: {
         doc: 'JWT secret key',
         format: String,
         default: 'secretKey',
         sensitive: true,
         env: 'JWT_SECRET_KEY'
      }
   }
});

export type Config = typeof config;

export default config;
