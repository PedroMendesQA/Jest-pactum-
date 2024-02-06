import pactum from 'pactum';
import dotenv from 'dotenv';
import { StatusCodes } from 'http-status-codes';
import { SimpleReporter } from '../report/simpleReporter';

describe('Search categories', () => {
  dotenv.config();
  const reporter = SimpleReporter;
  const baseUrl = process.env.ENVIRONMENT;
  const token = process.env.TOKEN;

  beforeAll(async () => {
    pactum.reporter.add(reporter);
  });

  describe('GET categories List', () => {
    it('Get categories List status 200', async () => {
      await pactum
        .spec()
        .get(`${baseUrl}/categories`)
        .withHeaders('x-api-key', `${token}`)
        .expectStatus(StatusCodes.OK);
    });
  });

  afterAll(async () => pactum.reporter.end());
});
