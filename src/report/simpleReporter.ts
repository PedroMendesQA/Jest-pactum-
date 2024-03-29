/* eslint-disable @typescript-eslint/no-unused-vars */
import { addMsg } from 'jest-html-reporters/helper';
import { Interaction } from 'pactum/src/exports/mock';
import * as Reporter from 'pactum/src/exports/reporter';

export const SimpleReporter = {
  name: 'SimpleReporter',

  async afterSpec(spec: Reporter.SpecData): Promise<void> {
    const FOUR = 4;
    const { start, end, status, request, response } = spec;
    await addMsg({
      message: JSON.stringify(
        { start, end, status, request, response },
        undefined,
        FOUR
      ),
      context: null
    });
  },

  afterStep(step: Record<string, unknown>): void {
    // required by contract.
  },

  afterTest(test: Record<string, unknown>): void {
    // required by contract
  },

  afterInteraction(interaction: Interaction): void {
    // required by contract
  },

  end(): void | Promise<void> {
    // required by contract
  }
};
