import PropTypes from 'prop-types';
import tokenPropType from './token';

export const configPropType = PropTypes.shape({
  token: tokenPropType,
  tenant: PropTypes.string,
  authenticator: PropTypes.string,
});

// Default configuration uses environment variables to configure URLs
export const defaultConfig = {
  token: null,
  tenant: process.env.TAPIS_TENANT_URL,
  authenticator: process.env.TAPIS_AUTHENTICATOR_URL,
};
