// src/global-components.js

export default function registerGlobalComponents(app) {
  const components = import.meta.glob('../components/global/*.vue', { eager: true });

  Object.entries(components).forEach(([path, component]) => {
    const componentName = 'x-' + path.split('/').pop().replace(/\.\w+$/, '').toLowerCase();
    app.component(componentName, component.default);
  });
}
