import _ from 'lodash';
import settingsEnv from 'app.settings.env';

let settings = {
  apiBase: '/api',
  debug: false
};

_.extend(settings, settingsEnv);

export default settings;
