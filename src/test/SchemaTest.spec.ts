import pactum from 'pactum';
import dotenv from 'dotenv';
import { StatusCodes } from 'http-status-codes';
import { SimpleReporter } from '../report/simpleReporter';
import dataSchema from '../data/schema.json';

describe('Schema test', () => {
  dotenv.config();
  const reporter = SimpleReporter;
  const baseUrl = process.env.ENVIRONMENT;
  const token = process.env.TOKEN;

  beforeAll(async () => {
    pactum.reporter.add(reporter);
  });

  describe('schema Get Breeds', () => {
    it('validation schema from Get Breeds by id 226', async () => {
      await pactum
        .spec()
        .get(`${baseUrl}/breeds/226`)
        .withHeaders('x-api-key', `${token}`)
        .expectStatus(StatusCodes.OK)
        .expectJsonSchema(dataSchema.schemaBreed);
    });
  });

  afterAll(async () => pactum.reporter.end());
});
