/* eslint-env jasmine */
import { testSaga } from 'redux-saga-test-plan';
import { thingsService } from '../services';
import { updateHomeControlThings, homeControlSwitch } from './homeControl';
import { waitForAction } from '../utils/things';
import ThingAction from '../constants/thingAction';
import {
  UPDATE_HOME_CONTROL_THINGS,
  UPDATE_HOME_CONTROL_THINGS_SUCCESS,
  HOME_CONTROL_SWITCH,
  HOME_CONTROL_SWITCH_SUCCESS,
  HOME_CONTROL_SWITCH_ERROR,
  START_BACKGROUND_SYNC,
  STOP_BACKGROUND_SYNC,
} from '../constants';

const PARENT_ID = 'mrn:thing:home:a7d72e41-2868-45bf-b14f-3c98c4b4f9e2';
const THING_ID = 'mrn:thing:light:deefa9d3-a8eb-437a-827c-25ff3d6e0ad7';

const things = [
  {
    parent_id: 'mrn:thing:home:a7d72e41-2868-45bf-b14f-3c98c4b4f9e2',
    thingIds: [
      'mrn:thing:light:deefa9d3-a8eb-437a-827c-25ff3d6e0ad7',
      'mrn:thing:smart_socket:dfbadeab-7ee6-424c-88eb-7f22cec6b32a',
    ],
  },
];

const thingsTwoParents = [
  {
    parent_id: 'mrn:thing:home:a7d72e41-2868-45bf-b14f-3c98c4b4f9e2',
    thingIds: [
      'mrn:thing:light:deefa9d3-a8eb-437a-827c-25ff3d6e0ad7',
      'mrn:thing:smart_socket:dfbadeab-7ee6-424c-88eb-7f22cec6b32a',
    ],
  },
  {
    parent_id: 'mrn:thing:home:b73d2e41-7587-45ac-e14f-3c98c4b4ffde',
    thingIds: [
      'mrn:thing:light:deefa9d3-a8eb-437a-827c-25ff3d6e0ad7',
      'mrn:thing:smart_socket:dfbadeab-7ee6-424c-88eb-7f22cec6b32a',
    ],
  },
];

const switchOnAction = {
  account_id: 'mrn:account:a792fe58-c5c3-4461-8f0a-92e6372c582d',
  action: 'switch_on',
  created_by: 'mrn:user:a49ab840-4b55-43c7-b0e5-28b9d675a14e',
  created_timestamp: 1534427451735,
  id: 'mrn:action_execution:f6ac1238-91e9-4773-89d3-0ceec3d0c6ef',
  last_modified_by: 'mrn:user:a49ab840-4b55-43c7-b0e5-28b9d675a14e',
  last_modified_timestamp: 1534427452423,
  parameters: {},
  result: {},
  state: 'finished',
  thing_id: 'mrn:thing:light:deefa9d3-a8eb-437a-827c-25ff3d6e0ad7',
  thing_type: 'mrn:things:light',
};

const retrievedThings = [
  {
    account_id: 'mrn:account:a792fe58-c5c3-4461-8f0a-92e6372c582d',
    actions: [],
    agents: [],
    config: {
      external_id: '47512',
      provider: 'mrn:provider:solidmation',
      solidmation: {
        switch_endpoint: '54895',
      },
      type: 'HPA-4134',
    },
    created_by: 'magenta_internal',
    created_timestamp: 1532087367618,
    id: 'mrn:thing:light:deefa9d3-a8eb-437a-827c-25ff3d6e0ad7',
    includes: {
      external_state: {
        label: 'off',
        on: false,
        online: true,
        value: 'null',
      },
    },
    info: {
      label: 'Test Light',
    },
    last_modified_by: 'magenta_internal',
    last_modified_timestamp: 1532087367631,
    metadata: {
      info: {
        label: {
          timestamp: 1532087367618,
        },
      },
      state: {},
    },
    parent_id: 'mrn:thing:home:a7d72e41-2868-45bf-b14f-3c98c4b4f9e2',
    state: {
      label: 'off',
      on: false,
      online: true,
      value: 'null',
    },
    things: [],
    type: 'mrn:things:light',
  },
  {
    account_id: 'mrn:account:a792fe58-c5c3-4461-8f0a-92e6372c582d',
    actions: [],
    agents: [],
    config: {
      external_id: '47511',
      provider: 'mrn:provider:solidmation',
      solidmation: {
        switch_endpoint: '54892',
      },
      type: 'HPA-4133',
    },
    created_by: 'magenta_internal',
    created_timestamp: 1532087367517,
    id: 'mrn:thing:smart_socket:dfbadeab-7ee6-424c-88eb-7f22cec6b32a',
    includes: {
      external_state: {
        label: 'on',
        on: true,
        online: true,
        value: 'null',
      },
    },
    info: {
      label: 'Test SmartSocket',
    },
    last_modified_by: 'magenta_internal',
    last_modified_timestamp: 1532087367531,
    metadata: {
      info: {
        label: {
          timestamp: 1532087367517,
        },
      },
      state: {},
    },
    parent_id: 'mrn:thing:home:a7d72e41-2868-45bf-b14f-3c98c4b4f9e2',
    state: {
      label: 'on',
      on: true,
      online: true,
      value: 'null',
    },
    things: [],
    type: 'mrn:things:smart_socket',
  },
];

const processedThings = {
  'mrn:thing:home:a7d72e41-2868-45bf-b14f-3c98c4b4f9e2': [
    {
      label: 'Test Light',
      type: 'mrn:things:light',
      id: 'mrn:thing:light:deefa9d3-a8eb-437a-827c-25ff3d6e0ad7',
      parent_id: 'mrn:thing:home:a7d72e41-2868-45bf-b14f-3c98c4b4f9e2',
      online: 'online',
      on: false,
      switching: false,
    },
    {
      label: 'Test SmartSocket',
      type: 'mrn:things:smart_socket',
      id: 'mrn:thing:smart_socket:dfbadeab-7ee6-424c-88eb-7f22cec6b32a',
      parent_id: 'mrn:thing:home:a7d72e41-2868-45bf-b14f-3c98c4b4f9e2',
      online: 'online',
      on: true,
      switching: false,
    },
  ],
};

const processedThingsTwoHomes = {
  'mrn:thing:home:a7d72e41-2868-45bf-b14f-3c98c4b4f9e2': [
    {
      label: 'Test Light',
      type: 'mrn:things:light',
      id: 'mrn:thing:light:deefa9d3-a8eb-437a-827c-25ff3d6e0ad7',
      parent_id: 'mrn:thing:home:a7d72e41-2868-45bf-b14f-3c98c4b4f9e2',
      online: 'online',
      on: false,
      switching: false,
    },
    {
      label: 'Test SmartSocket',
      type: 'mrn:things:smart_socket',
      id: 'mrn:thing:smart_socket:dfbadeab-7ee6-424c-88eb-7f22cec6b32a',
      parent_id: 'mrn:thing:home:a7d72e41-2868-45bf-b14f-3c98c4b4f9e2',
      online: 'online',
      on: true,
      switching: false,
    },
  ],
  'mrn:thing:home:b73d2e41-7587-45ac-e14f-3c98c4b4ffde': [
    {
      label: 'Test Light',
      type: 'mrn:things:light',
      id: 'mrn:thing:light:deefa9d3-a8eb-437a-827c-25ff3d6e0ad7',
      parent_id: 'mrn:thing:home:a7d72e41-2868-45bf-b14f-3c98c4b4f9e2',
      online: 'online',
      on: false,
      switching: false,
    },
    {
      label: 'Test SmartSocket',
      type: 'mrn:things:smart_socket',
      id: 'mrn:thing:smart_socket:dfbadeab-7ee6-424c-88eb-7f22cec6b32a',
      parent_id: 'mrn:thing:home:a7d72e41-2868-45bf-b14f-3c98c4b4f9e2',
      online: 'online',
      on: true,
      switching: false,
    },
  ],
};

const switchOnResponse = {
  account_id: 'mrn:account:a792fe58-c5c3-4461-8f0a-92e6372c582d',
  actions: [],
  agents: [],
  config: {
    external_id: '47512',
    provider: 'mrn:provider:solidmation',
    solidmation: {
      switch_endpoint: '54895',
    },
    type: 'HPA-4134',
  },
  created_by: 'magenta_internal',
  created_timestamp: 1532087367618,
  id: 'mrn:thing:light:deefa9d3-a8eb-437a-827c-25ff3d6e0ad7',
  includes: {
    external_state: {
      label: 'off',
      on: false,
      online: true,
      value: 'null',
    },
  },
  info: {
    label: 'Test Light',
  },
  last_modified_by: 'magenta_internal',
  last_modified_timestamp: 1532087367631,
  metadata: {
    info: {
      label: {
        timestamp: 1532087367618,
      },
    },
    state: {},
  },
  parent_id: 'mrn:thing:home:a7d72e41-2868-45bf-b14f-3c98c4b4f9e2',
  state: {
    label: 'on',
    on: true,
    online: true,
    value: 'null',
  },
  things: [],
  type: 'mrn:things:light',
};

const switchOnProcessed = {
  label: 'Test Light',
  type: 'mrn:things:light',
  id: 'mrn:thing:light:deefa9d3-a8eb-437a-827c-25ff3d6e0ad7',
  parent_id: 'mrn:thing:home:a7d72e41-2868-45bf-b14f-3c98c4b4f9e2',
  online: 'online',
  on: true,
  switching: false,
};

const switchOffResponse = {
  account_id: 'mrn:account:a792fe58-c5c3-4461-8f0a-92e6372c582d',
  actions: [],
  agents: [],
  config: {
    external_id: '47512',
    provider: 'mrn:provider:solidmation',
    solidmation: {
      switch_endpoint: '54895',
    },
    type: 'HPA-4134',
  },
  created_by: 'magenta_internal',
  created_timestamp: 1532087367618,
  id: 'mrn:thing:light:deefa9d3-a8eb-437a-827c-25ff3d6e0ad7',
  includes: {
    external_state: {
      label: 'off',
      on: false,
      online: true,
      value: 'null',
    },
  },
  info: {
    label: 'Test Light',
  },
  last_modified_by: 'magenta_internal',
  last_modified_timestamp: 1532087367631,
  metadata: {
    info: {
      label: {
        timestamp: 1532087367618,
      },
    },
    state: {},
  },
  parent_id: 'mrn:thing:home:a7d72e41-2868-45bf-b14f-3c98c4b4f9e2',
  state: {
    label: 'off',
    on: false,
    online: true,
    value: 'null',
  },
  things: [],
  type: 'mrn:things:light',
};

const switchOffProcessed = {
  label: 'Test Light',
  type: 'mrn:things:light',
  id: 'mrn:thing:light:deefa9d3-a8eb-437a-827c-25ff3d6e0ad7',
  parent_id: 'mrn:thing:home:a7d72e41-2868-45bf-b14f-3c98c4b4f9e2',
  online: 'online',
  on: false,
  switching: false,
};

describe('homeControl saga test', () => {
  it('should update home control things state', () => {
    const action = { type: UPDATE_HOME_CONTROL_THINGS, things };
    testSaga(updateHomeControlThings, action)
      .next()
      .call(thingsService.getThingsFromIds, action.things[0].thingIds, { _include: 'external_state' })
      .next(retrievedThings)
      .put({
        type: UPDATE_HOME_CONTROL_THINGS_SUCCESS,
        homeControls: processedThings,
      })
      .next()
      .isDone();
  });

  it('should update nothing when there are no things', () => {
    const action = { type: UPDATE_HOME_CONTROL_THINGS, things: [] };
    testSaga(updateHomeControlThings, action)
      .next()
      .put({
        type: UPDATE_HOME_CONTROL_THINGS_SUCCESS,
        homeControls: {},
      })
      .next()
      .isDone();
  });

  it('should update nothing when backdend retrieves nothing', () => {
    const action = { type: UPDATE_HOME_CONTROL_THINGS, things };
    testSaga(updateHomeControlThings, action)
      .next()
      .call(thingsService.getThingsFromIds, action.things[0].thingIds, { _include: 'external_state' })
      .next([])
      .put({
        type: UPDATE_HOME_CONTROL_THINGS_SUCCESS,
        homeControls: {},
      })
      .next()
      .isDone();
  });

  it('should update more than one home control things state', () => {
    const action = { type: UPDATE_HOME_CONTROL_THINGS, things: thingsTwoParents };
    testSaga(updateHomeControlThings, action)
      .next()
      .call(thingsService.getThingsFromIds, action.things[0].thingIds, { _include: 'external_state' })
      .next(retrievedThings)
      .call(thingsService.getThingsFromIds, action.things[1].thingIds, { _include: 'external_state' })
      .next(retrievedThings)
      .put({
        type: UPDATE_HOME_CONTROL_THINGS_SUCCESS,
        homeControls: processedThingsTwoHomes,
      })
      .next()
      .isDone();
  });

  it('should switch on a control switch', () => {
    const action = {
      type: HOME_CONTROL_SWITCH,
      thingId: THING_ID,
      parentId: PARENT_ID,
      value: true,
    };
    testSaga(homeControlSwitch, action)
      .next()
      .put({ type: STOP_BACKGROUND_SYNC })
      .next()
      .call(thingsService.executeAction, action.thingId, ThingAction.SwitchOn, {})
      .next(switchOnAction)
      .call(waitForAction, action.thingId, switchOnAction)
      .next()
      .next() // delay
      .call(thingsService.get, action.thingId, { _include: 'external_state' })
      .next(switchOnResponse)
      .put({
        type: HOME_CONTROL_SWITCH_SUCCESS,
        thingId: action.thingId,
        parentId: action.parentId,
        updatedThing: switchOnProcessed,
      })
      .next()
      .put({ type: START_BACKGROUND_SYNC })
      .next()
      .isDone();
  });

  it('should switch off a control switch', () => {
    const action = {
      type: HOME_CONTROL_SWITCH,
      thingId: THING_ID,
      parentId: PARENT_ID,
      value: false,
    };
    testSaga(homeControlSwitch, action)
      .next()
      .put({ type: STOP_BACKGROUND_SYNC })
      .next()
      .call(thingsService.executeAction, action.thingId, ThingAction.SwitchOff, {})
      .next(switchOnAction)
      .call(waitForAction, action.thingId, switchOnAction)
      .next()
      .next() // delay
      .call(thingsService.get, action.thingId, { _include: 'external_state' })
      .next(switchOffResponse)
      .put({
        type: HOME_CONTROL_SWITCH_SUCCESS,
        thingId: action.thingId,
        parentId: action.parentId,
        updatedThing: switchOffProcessed,
      })
      .next()
      .put({ type: START_BACKGROUND_SYNC })
      .next()
      .isDone();
  });

  it('should restart back sync if it fails', () => {
    const action = {
      type: HOME_CONTROL_SWITCH,
      thingId: THING_ID,
      parentId: PARENT_ID,
      value: false,
    };
    const _error = new Error('error');
    try {
      testSaga(homeControlSwitch, action)
        .next()
        .put({ type: STOP_BACKGROUND_SYNC })
        .next()
        .call(thingsService.executeAction, action.thingId, ThingAction.SwitchOff, {})
        .next(switchOnAction)
        .call(waitForAction, action.thingId, switchOnAction)
        .throw(_error)
        .put({
          type: HOME_CONTROL_SWITCH_ERROR,
          thingId: action.thingId,
          parentId: action.parentId,
        })
        .next()
        .put({ type: START_BACKGROUND_SYNC })
        .next();
    } catch (error) {
      expect(error).toEqual(_error);
    }
  });
});

