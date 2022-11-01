import pactum from 'pactum';
import dotenv from 'dotenv';
import { SimpleReporter } from '../report/simpleReporter';

describe('Search', () => {
  dotenv.config();
  const reporter = SimpleReporter;
  const baseUrl = process.env.ENVIRONMENT;
  const token = process.env.TOKEN;

  beforeAll(async () => {
    pactum.reporter.add(reporter);
  });

  describe('GET', () => {
    it('Get Breeds List', async () => {
      await pactum
        .spec()
        .get(`${baseUrl}`)
        .withHeaders('x-api-key', `${token}`)
        .expectStatus(200);
    });
  });

  afterAll(async () => pactum.reporter.end());
});
