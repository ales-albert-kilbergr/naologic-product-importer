import { ConfigModule, ConfigService, registerAs } from '@nestjs/config';
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

export interface ProductImporterConfig {
  app: {
    /**
     * The name of the application.
     */
    name: string;
    /**
     * The environment in which the application is running.
     */
    environment: 'production' | 'development';
    /**
     * The version of the application.s
     */
    version: string;
    /**
     * The commit hash of the application.
     */
    commit: string;
    /**
     * The log level of the application.
     */
    logLevel: 'info' | 'debug' | 'warn' | 'error';
  };
}

export type ProductImporterConfigService = ConfigService<ProductImporterConfig>;

const YAML_CONFIG_FILENAME = './config/app.config.yaml';
/**
 * Load the configuration from a yaml file and replace all placeholders with
 * environment variables.
 *
 * @param yamlPath The path to the yaml file relative to the root of the
 *    folder with built application.
 */
function fromYaml(yamlPath: string) {
  // Read the App config raw yaml file.
  // Allow to alter the path for tests global setup
  const configPath = process.env.APP_CONFIG_PATH || join(__dirname, yamlPath);

  let configRaw = readFileSync(configPath, 'utf8');
  // Replace all placeholders with environment variables.
  configRaw = configRaw.replace(/\${(\w+)}/g, (_, key) => {
    const value = process.env[key];
    // If the env variable is not available we will replace it with an empty string
    return value !== undefined ? value : '';
  });

  const config = yaml.load(configRaw) as ProductImporterConfig;

  config.app.name = config.app.name || process.env.npm_package_name;
  config.app.version = config.app.version || process.env.npm_package_version;

  // create list of namespaced configuration objects
  const loadFns = Reflect.ownKeys(config).map((key) => {
    const namespace = key as string;
    const subConfig = config[namespace];

    return registerAs(namespace, () => subConfig);
  });

  return loadFns;
}

// Compose Event Store Web Service configuration.
export const CONFIG_IMPORT = ConfigModule.forRoot({
  // Cache the environment variables performance.
  cache: true,
  // Load various modules configuration.
  load: fromYaml(YAML_CONFIG_FILENAME),
});
