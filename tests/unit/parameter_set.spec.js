import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import Vuex from 'vuex';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import { expect } from 'chai';
import { createLocalVue, mount } from '@vue/test-utils';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import ParameterSet from '@/components/ParameterSet.vue';
import ParameterCard from '@/components/ParameterCard.vue';
import AddParameterForm from '@/components/AddParameterForm.vue';
import EditParameterForm from '@/components/EditParameterForm.vue';
import AddValueForm from '@/components/AddValueForm.vue';
import EditValueForm from '@/components/EditValueForm.vue';
import state from '@/store/state';
import getters from '@/store/getters';
import mutations from '@/store/mutations';
import draggable from 'vuedraggable';
import flushPromises from 'flush-promises';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(BootstrapVue);
localVue.use(IconsPlugin);

const API_PREFIX = 'http://localhost:5000/tconfig/api/v1/';
const PARAMETER_SET_URL = API_PREFIX.concat('parameterset/');
const PARAMETER_URL = API_PREFIX.concat('parameters/');

const MOCK_PARAMETER_SET = {
  name: null,
  parameters: [
    {
      excluded: [],
      excluded_by: [],
      name: 'Colour',
      parameter_set: 1,
      position: 0,
      uid: 1,
      values: [
        {
          name: 'Red',
          parameter: 1,
          position: 0,
          uid: 1,
        },
        {
          name: 'Green',
          parameter: 1,
          position: 1,
          uid: 2,
        },
      ],
    },
    {
      excluded: [],
      excluded_by: [],
      name: 'Pet',
      parameter_set: 1,
      position: 1,
      uid: 2,
      values: [
        {
          name: 'Bird',
          parameter: 2,
          position: 0,
          uid: 3,
        },
        {
          name: 'Cat',
          parameter: 2,
          position: 1,
          uid: 4,
        },
        {
          name: 'Dog',
          parameter: 2,
          position: 2,
          uid: 5,
        },
        {
          name: 'Fish',
          parameter: 2,
          position: 3,
          uid: 6,
        },
      ],
    },
  ],
  position: null,
  uid: 1,
};

const MOCK_DATA = {
  parameter_list_url: PARAMETER_URL,
  parameter_set: MOCK_PARAMETER_SET,
  parameter_set_url: PARAMETER_SET_URL,
};

describe('ParameterSet.vue', () => {
  let wrapper;
  let store;
  let mock;

  beforeEach(() => {
    mock = new AxiosMockAdapter(axios);
    mock.onGet(PARAMETER_SET_URL).reply(200, MOCK_DATA);
    mock.onPut(PARAMETER_URL).reply(200, {});
    store = new Vuex.Store({
      state,
      getters,
      mutations,
    });
    wrapper = mount(ParameterSet, {
      store,
      localVue,
    });
  });

  afterEach(() => {
    mock.restore();
    const statusInfo = {
      message: 'Welcome',
      variant: 'info',
    };
    store.commit('setStatus', statusInfo);
  });

  it('should have 1 add parameter form component', () => {
    const psets = wrapper.findAllComponents(AddParameterForm);
    expect(psets.length).to.equal(1);
    expect(psets.is(AddParameterForm)).to.equal(true);
  });

  it('should have 1 edit parameter form component', () => {
    const configs = wrapper.findAllComponents(EditParameterForm);
    expect(configs.length).to.equal(1);
    expect(configs.is(EditParameterForm)).to.equal(true);
  });

  it('should have 1 add value form component', () => {
    const psets = wrapper.findAllComponents(AddValueForm);
    expect(psets.length).to.equal(1);
    expect(psets.is(AddValueForm)).to.equal(true);
  });

  it('should have 1 edit value form component', () => {
    const configs = wrapper.findAllComponents(EditValueForm);
    expect(configs.length).to.equal(1);
    expect(configs.is(EditValueForm)).to.equal(true);
  });

  it('should load a parameter set on creation', async () => {
    // Wait for asynchronous API call to get parameter set
    await localVue.nextTick();
    expect(mock.history.get.length).to.equal(1);
    expect(mock.history.get[0].url).to.equal(PARAMETER_SET_URL);
    // Now wait for API response
    await localVue.nextTick();
    // Expect that the 'parameter_set' attribute of response is stored.
    // Check object equivalence, not identity
    expect(wrapper.vm.parameterSet).to.eql(MOCK_DATA.parameter_set);
    // eslint-disable-next-line
  });

  it('should have 2 parameter card components after loading 2 parameters', async () => {
    // Wait for asynchronous API call to get parameter set
    await localVue.nextTick();
    expect(mock.history.get.length).to.equal(1);
    // Now wait for API response
    await localVue.nextTick();
    // Now wait for render
    await localVue.nextTick();
    // Mock data has 2 parameters
    const pcards = wrapper.findAllComponents(ParameterCard);
    expect(pcards.length).to.equal(2);
    expect(pcards.is(ParameterCard)).to.equal(true);
  });

  it('should show the parameter names and number of values', async () => {
    // Wait for asynchronous API call to get parameter set
    await localVue.nextTick();
    expect(mock.history.get.length).to.equal(1);
    // Now wait for API response
    await localVue.nextTick();
    // Now wait for render
    await localVue.nextTick();
    // Mock data has 2 parameters
    const colourMsg = 'Colour - 2 values';
    expect(wrapper.text()).to.include(colourMsg);
    const petMsg = 'Pet - 4 values';
    expect(wrapper.text()).to.include(petMsg);
  });

  it('should have 3 draggable components after loading 2 parameters', async () => {
    // Wait for asynchronous API call to get parameter set
    await localVue.nextTick();
    expect(mock.history.get.length).to.equal(1);
    // Now wait for API response
    await localVue.nextTick();
    // Now wait for render
    await localVue.nextTick();
    // One draggable for parameter list, one draggable for each of
    // two value lists.
    const dragndrop = wrapper.findAllComponents(draggable);
    expect(dragndrop.length).to.equal(3);
  });

  it('should call PUT on /parameters when parameter moved', async () => {
    // Wait for asynchronous API call to get parameter set
    await localVue.nextTick();
    // Now wait for API response
    await localVue.nextTick();
    // Now wait for render
    await localVue.nextTick();
    const parameterDraggable = wrapper.findComponent(draggable);
    expect(mock.history.put.length).to.equal(0);
    const changeData = {
      moved: {
        element: wrapper.vm.parameterSet.parameters[0],
        oldIndex: 0,
        newIndex: 1,
      },
    };
    parameterDraggable.vm.$emit('change', changeData);
    await localVue.nextTick();
    expect(mock.history.put.length).to.equal(1);
    const expectedApiData = {
      oldIndex: 0,
      newIndex: 1,
    };
    expect(mock.history.put[0].url).to.equal(PARAMETER_URL);
    expect(mock.history.put[0].data).to.equal(JSON.stringify(expectedApiData));
  });

  it('should update status when parameter moved', async () => {
    // Wait for asynchronous API call to get parameter set
    await localVue.nextTick();
    // Now wait for API response
    await localVue.nextTick();
    // Now wait for render
    await localVue.nextTick();
    const parameterDraggable = wrapper.findComponent(draggable);
    const changeData = {
      moved: {
        element: wrapper.vm.parameterSet.parameters[0],
        oldIndex: 0,
        newIndex: 1,
      },
    };
    parameterDraggable.vm.$emit('change', changeData);
    // Await API call
    await localVue.nextTick();
    const beforeExpectedStatus = {
      message: 'Welcome',
      variant: 'info',
    };
    expect(store.getters.status).to.eql(beforeExpectedStatus);
    // Render after API response
    await localVue.nextTick();
    const afterExpectedStatus = {
      message: 'Parameter "Pet" moved from position 0 to 1',
      variant: 'success',
    };
    expect(store.getters.status).to.eql(afterExpectedStatus);
  });

  it('should ignore vuedraggable "added" event', async () => {
    // Wait for asynchronous API call to get parameter set
    await localVue.nextTick();
    // Now wait for API response
    await localVue.nextTick();
    // Now wait for render
    await localVue.nextTick();
    const parameterDraggable = wrapper.findComponent(draggable);
    expect(mock.history.put.length).to.equal(0);
    const changeData = {
      added: {
        element: wrapper.vm.parameterSet.parameters[0],
        newIndex: 0,
      },
    };
    parameterDraggable.vm.$emit('change', changeData);
    await localVue.nextTick();
    // Should not trigger an API call
    expect(mock.history.put.length).to.equal(0);
  });

  it('should ignore vuedraggable "removed" event', async () => {
    // Wait for asynchronous API call to get parameter set
    await localVue.nextTick();
    // Now wait for API response
    await localVue.nextTick();
    // Now wait for render
    await localVue.nextTick();
    const parameterDraggable = wrapper.findComponent(draggable);
    expect(mock.history.put.length).to.equal(0);
    const changeData = {
      removed: {
        element: wrapper.vm.parameterSet.parameters[0],
        oldIndex: 0,
      },
    };
    parameterDraggable.vm.$emit('change', changeData);
    await localVue.nextTick();
    // Should not trigger an API call
    expect(mock.history.put.length).to.equal(0);
  });

  it('should show error message on API call network error', async () => {
    mock.restore();
    mock = new AxiosMockAdapter(axios);
    mock.onGet(PARAMETER_SET_URL).reply(200, MOCK_DATA);
    mock.onPut(PARAMETER_URL).networkError();
    // Wait for asynchronous API call to get parameter set
    await localVue.nextTick();
    // Now wait for API response
    await localVue.nextTick();
    // Now wait for render
    await localVue.nextTick();
    const parameterDraggable = wrapper.findComponent(draggable);
    expect(mock.history.put.length).to.equal(0);
    const changeData = {
      moved: {
        element: wrapper.vm.parameterSet.parameters[0],
        oldIndex: 0,
        newIndex: 1,
      },
    };
    parameterDraggable.vm.$emit('change', changeData);
    // Await API call
    await localVue.nextTick();
    const beforeExpectedStatus = {
      message: 'Welcome',
      variant: 'info',
    };
    expect(store.getters.status).to.eql(beforeExpectedStatus);
    // Render after API response
    await flushPromises();
    const afterExpectedStatus = {
      message: 'Network Error',
      variant: 'danger',
    };
    expect(store.getters.status).to.deep.include(afterExpectedStatus);
  });

  it('should show error message on API call timeout', async () => {
    mock.restore();
    mock = new AxiosMockAdapter(axios);
    mock.onGet(PARAMETER_SET_URL).reply(200, MOCK_DATA);
    mock.onPut(PARAMETER_URL).timeout();
    // Wait for asynchronous API call to get parameter set
    await localVue.nextTick();
    // Now wait for API response
    await localVue.nextTick();
    // Now wait for render
    await localVue.nextTick();
    const parameterDraggable = wrapper.findComponent(draggable);
    expect(mock.history.put.length).to.equal(0);
    const changeData = {
      moved: {
        element: wrapper.vm.parameterSet.parameters[0],
        oldIndex: 0,
        newIndex: 1,
      },
    };
    parameterDraggable.vm.$emit('change', changeData);
    // Await API call
    await localVue.nextTick();
    const beforeExpectedStatus = {
      message: 'Welcome',
      variant: 'info',
    };
    expect(store.getters.status).to.eql(beforeExpectedStatus);
    // Render after API response
    await flushPromises();
    const afterExpectedStatus = {
      message: 'timeout of 0ms exceeded',
      variant: 'danger',
    };
    expect(store.getters.status).to.deep.include(afterExpectedStatus);
  });

  it('should show error message on API call 500 response', async () => {
    mock.restore();
    mock = new AxiosMockAdapter(axios);
    mock.onGet(PARAMETER_SET_URL).reply(200, MOCK_DATA);
    mock.onPut(PARAMETER_URL).reply(500, {});
    // Wait for asynchronous API call to get parameter set
    await localVue.nextTick();
    // Now wait for API response
    await localVue.nextTick();
    // Now wait for render
    await localVue.nextTick();
    const parameterDraggable = wrapper.findComponent(draggable);
    expect(mock.history.put.length).to.equal(0);
    const changeData = {
      moved: {
        element: wrapper.vm.parameterSet.parameters[0],
        oldIndex: 0,
        newIndex: 1,
      },
    };
    parameterDraggable.vm.$emit('change', changeData);
    // Await API call
    await localVue.nextTick();
    const beforeExpectedStatus = {
      message: 'Welcome',
      variant: 'info',
    };
    expect(store.getters.status).to.eql(beforeExpectedStatus);
    // Render after API response
    await flushPromises();
    const afterExpectedStatus = {
      message: 'Request failed with status code 500',
      variant: 'danger',
    };
    expect(store.getters.status).to.deep.include(afterExpectedStatus);
  });
});
