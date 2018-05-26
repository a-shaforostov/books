import { Compute } from "cerebral";
import { state } from "cerebral/tags";

export default Compute(
  state`features`,
  state`edit.selectedFeature`,
  state`edit.selectedScenario`,
  (features, selectedFeature, selectedScenario, get) => {
    const feature = features.find(feature => feature.id === selectedFeature);
    const scenario =
      feature && feature.scenarios ?
        feature.scenarios.find(scenario => scenario.id === selectedScenario) :
        [];
    return scenario;
  }
);
