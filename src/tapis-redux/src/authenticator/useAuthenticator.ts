import { useSelector } from 'react-redux';
import { authenticatorLoginRequest } from './actions';
import { TapisState } from '../store/rootReducer';
import { LoginCallback } from './types';
import { Config } from '../types/config';

const useAuthenticator = (config: Config) => {
  const { token, loading, error } = useSelector((state: TapisState) => state.authenticator);
  return {
    token,
    loading,
    error,
    login: (username, password, onAuth: LoginCallback = null) =>
      authenticatorLoginRequest({
        username,
        password,
        authenticator: config.authenticator,
        onAuth
      })
  };
};

export default useAuthenticator;
