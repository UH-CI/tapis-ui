import { ACTIONS } from './systems.actions';

export const initialState = {
  definitions: {},
  loading: true,
  error: null,
  failed: false,
};

export const addSystems = (definitions, listing) => {
  // Append listing results to existing definitions, generate new object
  const result = { ...definitions };
  listing.forEach((system) => {
    result[system.id] = { ...system };
  });
  return result;
};

export default function systems(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.LIST.START:
      return {
        ...state,
        loading: true,
        error: null,
        failed: false,
      };
    case ACTIONS.LIST.SUCCESS:
      return {
        ...state,
        definitions: addSystems(state.definitions, action.payload),
        loading: false,
        error: null,
        failed: false,
      };
    case ACTIONS.LIST.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        failed: false,
      };
    case ACTIONS.LIST.FAILED:
      return {
        ...state,
        loading: false,
        error: null,
        failed: true,
      };
    default:
      return state;
  }
}
