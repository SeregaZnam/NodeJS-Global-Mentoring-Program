import convict from 'convict';

const config = convict({
  port: {
    doc: "The port to bind.",
    format: "port",
    default: 3000,
    env: "PORT",
    arg: "port",
  }
});

export type Config = typeof config;

export default config;