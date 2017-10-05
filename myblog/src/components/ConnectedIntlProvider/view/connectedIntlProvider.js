import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';

const mapStateToProps = (state) => {
  let { lang, messages } = state.locales;

  return {
    locale: lang,
    messages: messages
  }
}

export default connect(mapStateToProps)(IntlProvider);
