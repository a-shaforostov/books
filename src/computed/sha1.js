import { Compute } from "cerebral";
import { props } from "cerebral/tags";
import sha1 from 'js-sha1';

export const entityUrl = Compute(
  props`entity`,
  (entity) => {
    return {
      entityUrl: entities[entity].url
    };
  }
);
