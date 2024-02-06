import pactum, { sleep, request } from 'pactum';
import dotenv from 'dotenv';
import { StatusCodes } from 'http-status-codes';
import { SimpleReporter } from '../report/simpleReporter';
import { util } from '../helper/util';

describe('Vote breed', () => {
  dotenv.config();
  let imageId: import('pactum/src/models/Spec');
  let vote_id: import('pactum/src/models/Spec');
  const reporter = SimpleReporter;
  const baseUrl = process.env.ENVIRONMENT;
  const token = process.env.TOKEN;
  request.setDefaultTimeout(parseInt(process.env.PACTUM_REQUEST_TIMEOUT));

  beforeAll(async () => {
    pactum.reporter.add(reporter);

    imageId = await pactum
      .spec()
      .get(`${baseUrl}/breeds/226`)
      .withHeaders('x-api-key', `${token}`)
      .expectStatus(StatusCodes.OK)
      .returns('reference_image_id');
  });

  describe('Vote one Breed', () => {
    it('Vote husky', async () => {
      await sleep(2000);
      await pactum
        .spec()
        .post(`${baseUrl}/votes`)
        .withHeaders('x-api-key', `${token}`)
        .withJson({
          image_id: `${imageId}`,
          sub_id: `Test_User_${util.getRandomNumber()}`,
          value: 1
        })
        .expectStatus(StatusCodes.CREATED)
        .expectBodyContains('id')
        .expectJsonMatch({ message: 'SUCCESS' });
    });

    it('Delete vote breed', async () => {
      await sleep(2000);
      vote_id = await pactum
        .spec()
        .post(`${baseUrl}/votes`)
        .withHeaders('x-api-key', `${token}`)
        .withJson({
          image_id: `${imageId}`,
          sub_id: `Test_User_${util.getRandomNumber()}`,
          value: 1
        })
        .expectStatus(StatusCodes.CREATED)
        .returns('id');

      await sleep(2000);
      await pactum
        .spec()
        .delete(`${baseUrl}/votes/${vote_id}`)
        .withHeaders('x-api-key', `${token}`)
        .expectStatus(StatusCodes.OK);
    });
  });

  afterAll(async () => pactum.reporter.end());
});
