/* This script generates mock data for local development.
 This way you don't have to point to an actual API,
 but you can enjoy realistic, but randomized data,
 and rapid page loads due to local, static data.
 */

/* eslint-disable import/no-extraneous-dependencies */

import jsf from 'json-schema-faker';
import fs from 'fs';
import chalk from 'chalk';
import _ from 'lodash';
import schema from './mockDataSchemaThings';
import generateRandomPoint from './mock-api-tools/generateRandomCoords';

const json = jsf(schema);

const jsonWithCoords = _.map(json.things, (obj) => {
  const randomPoint = generateRandomPoint({ lat: -34.593229, lng: -58.454949 }, 6000);
  const latitude = randomPoint.lat;
  const longitude = randomPoint.lng;
  const coordinates = [latitude, longitude];

  return Object.assign({}, obj, { state: { location: { coordinates } } });
});

const stringifiedJson = JSON.stringify(jsonWithCoords);

fs.writeFile('./api/things.json', stringifiedJson, (err) => {
  if (err) return console.log(chalk.red(err));
  return console.log(chalk.green('Mock data generated.'));
});
