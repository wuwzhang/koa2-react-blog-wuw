import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'antd/dist/antd.css';
import qs from 'qs';

import store from './Store.js';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import { IntlProvider, addLocaleData } from 'react-intl';

import zh from 'react-intl/locale-data/zh';
import en from 'react-intl/locale-data/en';

import zh_CN from './locale/zh_CN';
import en_US from './locale/en_US';

const languages = navigator.languages;
const browserLanguage = languages[0];

const locale = qs.parse(document.location.search && document.location.search.slice(1)).locale || browserLanguage || 'en-US';
const localePrefix = locale.slice(0, locale.indexOf('-'));

const scripts = [];

if (!window.Intl) {
  // should output by server by <script>
  scripts.push('https://as.alipayobjects.com/g/component/intl/1.0.1/Intl.js');
  scripts.push('https://as.alipayobjects.com/g/component/intl/1.0.1/locale-data/jsonp/en-US.js');
  // the following should be output by server template conditionally by <script>
  if (locale !== 'en-US') {
    scripts.push(`https://as.alipayobjects.com/g/component/intl/1.0.1/locale-data/jsonp/${locale}.js`);
  }
  // end
}
// should output by server by <script>
scripts.push('https://as.alipayobjects.com/g/component/react-intl/2.0.0/locale-data/en.js');
// the following should be output by server template conditionally by <script>
if (localePrefix !== 'en') {
  scripts.push(`https://as.alipayobjects.com/g/component/react-intl/2.0.0/locale-data/${localePrefix}.js`);
}
// end

let messages = {};
messages['zh-CN'] = zh_CN;
messages['en-US'] = en_US;

addLocaleData([...en, ...zh]);

ReactDOM.render(
  <IntlProvider locale= { locale } messages={ messages[locale] }>
    <Provider store={store}>
      <Routes />
    </Provider>
  </IntlProvider>,
  document.getElementById('root')
);

registerServiceWorker();
