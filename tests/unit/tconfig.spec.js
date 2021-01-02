import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import Vuex from 'vuex';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import { expect } from 'chai';
import { createLocalVue, mount } from '@vue/test-utils';
import Tconfig from '@/components/Tconfig.vue';
import ParameterSet from '@/components/ParameterSet.vue';
import Configurations from '@/components/Configurations.vue';
import state from '@/store/state';
import getters from '@/store/getters';
import mutations from '@/store/mutations';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(BootstrapVue);
localVue.use(IconsPlugin);

describe('Tconfig.vue', () => {
  let wrapper;
  let store;

  beforeEach(() => {
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

  it('should have 1 parameter set component', () => {
    const psets = wrapper.findAllComponents(ParameterSet);
    expect(psets.length).to.equal(1);
    expect(psets.is(ParameterSet)).to.equal(true);
  });

  it('should have 1 configurations component', () => {
    const configs = wrapper.findAllComponents(Configurations);
    expect(configs.length).to.equal(1);
    expect(configs.is(Configurations)).to.equal(true);
  });
});
