import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import Vuex from 'vuex';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import { expect } from 'chai';
import { createLocalVue, mount } from '@vue/test-utils';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import Tconfig from '@/components/Tconfig.vue';
import ParameterSet from '@/components/ParameterSet.vue';
import state from '@/store/state';
import getters from '@/store/getters';
import mutations from '@/store/mutations';

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

describe('Tconfig.vue', () => {
  let wrapper;
  let store;
  let mock;

  beforeEach(() => {
    mock = new AxiosMockAdapter(axios);
    mock.onGet(PARAMETER_SET_URL).reply(200, MOCK_DATA);
    store = new Vuex.Store({
      state,
      getters,
      mutations,
    });
    wrapper = mount(Tconfig, {
      store,
      localVue,
    });
  });

  afterEach(() => {
    mock.restore();
  });

  it('should have header "Test Configuration Generator"', () => {
    const msg = 'Test Configuration Generator';
    expect(wrapper.text()).to.include(msg);
  });

  it('should have welcome message', () => {
    const msg = 'Welcome';
    expect(wrapper.text()).to.include(msg);
  });

  it('should have "Add Parameter" button', () => {
    const msg = 'Add Parameter';
    expect(wrapper.text()).to.include(msg);
  });

  it('should have "Generate Configurations" button', () => {
    const msg = 'Generate Configurations';
    expect(wrapper.text()).to.include(msg);
  });

  it('should load a parameter set on creation"', async () => {
    // Wait for asynchronous API call to get parameter set
    await localVue.nextTick();
    expect(mock.history.get.length).to.equal(1);
    // Now wait for render from API response
    await localVue.nextTick();
    // Expect that the 'parameter_set' attribute of response is stored.
    // Check object equivalence, not identity
    expect(wrapper.vm.parameterSet).to.eql(MOCK_DATA.parameter_set);
  });

  it('should have 1 parameter set component"', () => {
    const psets = wrapper.findAllComponents(ParameterSet);
    expect(psets.length).to.equal(1);
    expect(psets.is(ParameterSet)).to.equal(true);
  });
});
