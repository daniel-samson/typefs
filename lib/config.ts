import { readFileSync } from 'fs';
import { resolve } from 'path';
import { Configuration } from 'typefs-registry';

export type PackageConfiguration = string | undefined;

/**
 * Loads the configuration from package.json or a separate file
 *
 * @returns {Configuration} typefs configuration
 */
export function config(): Configuration {
  const c = process.env.npm_package_config_typefs;

  if (c === undefined) {
    throw new Error('missing path "config.typefs" in package.json.');
  }

  if (c.endsWith('.js')) {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    return require(resolve(c));
  }

  return JSON.parse(readFileSync(c).toString('utf-8'));
}
