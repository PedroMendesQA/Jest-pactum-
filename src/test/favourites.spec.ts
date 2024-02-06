import pactum, { sleep, request } from 'pactum';
import dotenv from 'dotenv';
import { StatusCodes } from 'http-status-codes';
import { SimpleReporter } from '../report/simpleReporter';
import { util } from '../helper/util';

describe('Favorite breed', () => {
  dotenv.config();
  let imageId: import('pactum/src/models/Spec');
  let favorite_id: import('pactum/src/models/Spec');
  const reporter = SimpleReporter;
  const baseUrl = process.env.ENVIRONMENT;
  const token = process.env.TOKEN;
  request.setDefaultTimeout(30000);

  beforeAll(async () => {
    pactum.reporter.add(reporter);

    imageId = await pactum
      .spec()
      .get(`${baseUrl}/breeds/226`)
      .withHeaders('x-api-key', `${token}`)
      .expectStatus(StatusCodes.OK)
      .returns('reference_image_id');
  });

  describe('Favourites One', () => {
    it('favourite breed', async () => {
      await pactum
        .spec()
        .post(`${baseUrl}/favourites`)
        .withHeaders('x-api-key', `${token}`)
        .withJson({
          image_id: `${imageId}`,
          sub_id: `Test_User_${util.getRandomNumber()}`
        })
        .expectStatus(StatusCodes.OK)
        .expectBodyContains('id')
        .expectJsonMatch({ message: 'SUCCESS' });
    });

    it('Delete favourite breed', async () => {
      favorite_id = await pactum
        .spec()
        .post(`${baseUrl}/favourites`)
        .withHeaders('x-api-key', `${token}`)
        .withJson({
          image_id: `${imageId}`,
          sub_id: `Test_User_${util.getRandomNumber()}`
        })
        .expectStatus(StatusCodes.OK)
        .returns('id');

      sleep(2000);
      await pactum
        .spec()
        .delete(`${baseUrl}/favourites/${favorite_id}`)
        .withHeaders('x-api-key', `${token}`)
        .expectStatus(StatusCodes.OK)
        .expectJsonMatch({ message: 'SUCCESS' });
    });
  });

  afterAll(async () => pactum.reporter.end());
});
