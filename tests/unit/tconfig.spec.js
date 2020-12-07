import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import { expect } from 'chai';
import { createLocalVue, mount } from '@vue/test-utils';
import Tconfig from '@/components/Tconfig.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(IconsPlugin);

describe('Tconfig.vue', () => {
  let component;

  beforeEach(() => {
    component = mount(Tconfig, {
      localVue,
    });
  });

  it('should have "Add Parameter" button', () => {
    const msg = 'Add Parameter';
    expect(component.text()).to.include(msg);
  });

  it('should have "Generate Configurations" button', () => {
    const msg = 'Generate Configurations';
    expect(component.text()).to.include(msg);
  });

  it('should have header "Test Configuration Generator"', () => {
    const msg = 'Test Configuration Generator';
    expect(component.text()).to.include(msg);
  });
});
