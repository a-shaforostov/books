import { Compute } from "cerebral";
import { props } from "cerebral/tags";
import { entities } from '../app/constants';

export const entityUrl = Compute(
  props`entity`,
  (entity) => {
    return {
      entityUrl: entities[entity].url
    };
  }
);
