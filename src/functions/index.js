export function importComponents() {
    const files = require.context('./', true, /\.vue$/);
  
    const components = {};
  
    files.keys().forEach((key) => {
      const componentName = key.split('/').pop().replace(/\.\w+$/, '');
      const componentConfig = files(key);
  
      components[componentName] = componentConfig.default || componentConfig;
    });
  
    return components;
  }