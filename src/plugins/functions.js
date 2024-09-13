export default {
  install(app) {
    app.config.globalProperties.$calculateSizeWidth = () => {
      const width = window.innerWidth;
      let sizeWidth = '';

      width <= 499 && (sizeWidth = 'xxs');
      width > 499 && (sizeWidth = 'xs');
      width > 599 && (sizeWidth = 'sm');
      width > 799 && (sizeWidth = 'md');
      width > 1023 && (sizeWidth = 'lg');
      width > 1279 && (sizeWidth = 'xl');
      width > 1535 && (sizeWidth = 'xxl');

      return sizeWidth;
    };
  },
};
