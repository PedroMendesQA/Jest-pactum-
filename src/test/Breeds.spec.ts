import pactum from 'pactum';
import dotenv from 'dotenv';
import { StatusCodes } from 'http-status-codes';
import { SimpleReporter } from '../report/simpleReporter';
import { expression } from 'pactum-matchers';

describe('Search', () => {
  dotenv.config();
  const reporter = SimpleReporter;
  const baseUrl = process.env.ENVIRONMENT;
  const token = process.env.TOKEN;
  const id = 226;

  beforeAll(async () => {
    pactum.reporter.add(reporter);
  });

  describe('GET Breeds List', () => {
    it('Get Breeds List status 200', async () => {
      await pactum
        .spec()
        .get(`${baseUrl}/breeds`)
        .withHeaders('x-api-key', `${token}`)
        .expectStatus(StatusCodes.OK);
    });

    it('Get Breed from id 226', async () => {
      await pactum
        .spec()
        .get(`${baseUrl}/breeds/${id}`)
        .withHeaders('x-api-key', `${token}`)
        .expectStatus(StatusCodes.OK)
        .expectBodyContains('id')
        .expectJsonMatch({
          name: 'Siberian Husky',
          bred_for: 'Sled pulling',
          breed_group: 'Working',
          life_span: '12 years',
          temperament: 'Outgoing, Friendly, Alert, Gentle, Intelligent'
        });
    });
  });

  afterAll(async () => pactum.reporter.end());
});
