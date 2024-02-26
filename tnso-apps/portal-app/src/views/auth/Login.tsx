import React, { KeyboardEvent, useCallback, useEffect } from 'react';
import { TRANSLATION } from '../../../src/utils/const/translation';
import { useNavigate, Link } from 'react-router-dom';
import { User } from '../../interfaces/auth/login/login';
import { AuthHelper } from '../../helpers/auth/AuthHelper';
import logo from '../../assets/images/tns/tns-logo-white.png';
import withAuthorization from '../../HOC/withAuthorization';
import { Roles } from '../../interfaces/auth/roleAndPermission/role';
import { Controller, Form, useForm } from 'react-hook-form';
import { store } from '../../store/StoreMobx';
import { observer } from 'mobx-react';
import { LanguageSelector } from '../../components/shared/language/LanguageSelector';
import Text from 'i18n-module/i18nModule';
import i18n from 'i18n-module/i18n';
import { useAsyncCall } from '../../hooks/useAsyncCall';
import {
  TNSOCard,
  TNSOInput,
  InputType,
  TNSOButton,
  Variants,
} from '@tnso/ui-components/dist';
import _ from 'lodash';

const LoginInternal: React.FC = (): JSX.Element => {
  const { shared } = store;
  const navigate = useNavigate();

  const {
    watch,
    control,
    getValues,
    reset,
    formState: { errors },
  } = useForm<User>({
    defaultValues: { username: '', password: '' },
    mode: 'all',
  });

  const emptyUsername = watch('username');
  const emptyPassword = watch('password');

  const handleSubmit = useCallback(async () => {
    const data = getValues();
    const auth = await store.auth.login(data as User);
    const token = auth?.accessToken ?? auth?.token;
    if (token) {
      const { role } = AuthHelper.getAuthByToken(token);
      if (role === Roles.SuperUser) {
        navigate('/administration/company');
        reset();
        return;
      }
      navigate('/monitoring/devices');
      reset();
    }
    return;
  }, [getValues, navigate, reset]); 

  const defaultLanguage = useCallback(async () => {
    await i18n.changeLanguage(shared.currentLanguage);
  }, [shared.currentLanguage]);

  useAsyncCall(defaultLanguage, []);

  const handleKeyPress = useCallback(
    async (event: KeyboardEvent<HTMLInputElement>): Promise<void> => {
      if (event.key === 'Enter') {
        event.preventDefault();
        await handleSubmit();
      }
    },
    [handleSubmit]
  );

  useEffect(() => {
    document.addEventListener(
      'keypress',
      handleKeyPress as unknown as EventListener
    );

    return () => {
      document.removeEventListener(
        'keypress',
        handleKeyPress as unknown as EventListener
      );
    };
  }, []);

  return (
    <Form
      className="login-container d-flex justify-content-center align-items-center"
      control={control}
    >
      <TNSOCard className="login-card">
        <LanguageSelector />
        <div className="d-flex justify-content-start align-items-end w-100">
          <img src={logo} alt="logo" className="logo" width={110} />
          <h2 className="text-center text-md-start">
            <b>
              <Text text={TRANSLATION.LOGIN.hello} />
            </b>
            <br />
            <b>
              <Text text={TRANSLATION.LOGIN.welcome} />
            </b>
          </h2>
        </div>
        <div>
          <label htmlFor="username">
            <Text text={TRANSLATION.SHARED.username} />
          </label>
          {/* eslint-disable-next-line */}
          <Controller
            name="username"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TNSOInput {...field} id="username" className="w-100" />
            )}
          />
          {errors.username && (
            <small className="text-danger">
              <Text text={TRANSLATION.LOGIN.usernameRequired} />
            </small>
          )}
        </div>
        <div>
          <label htmlFor="Password">
            <Text text={TRANSLATION.LOGIN.password} />
          </label>
          <Controller
            name="password"
            control={control}
            rules={{ required: true }}
            // eslint-disable-next-line
            render={({ field }) => (
              <TNSOInput
                id="password"
                {...field}
                type={InputType.Password}
                className="w-100"
              />
            )}
          />
          {errors.password && (
            <small className="text-danger">
              <Text text={TRANSLATION.LOGIN.passwordRequired} />
            </small>
          )}
          <Link
            to="/auth/password/forgot"
            className="d-flex justify-content-end"
          >
            <small>
              <Text text={TRANSLATION.LOGIN.forgotPassword} />
            </small>
          </Link>
        </div>
        <TNSOButton
          variant={Variants.Primary}
          className="tnso-button tnso-button-primary w-100 d-flex justify-content-center align-items-center"
          // eslint-disable-next-line
          onClick={() => handleSubmit()}
          disabled={_.isEmpty(emptyUsername) || _.isEmpty(emptyPassword)}
        >
          <Text text={TRANSLATION.LOGIN.signIn} />
        </TNSOButton>
      </TNSOCard>
    </Form>
  );
};

// to get allowed roles for routes, use the route name from Router.tsx
const Login = withAuthorization(
  observer(LoginInternal),
  AuthHelper.getAllowedRolesForRoute('login')
);

export default Login;
