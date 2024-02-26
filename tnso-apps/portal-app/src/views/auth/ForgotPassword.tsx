import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { TRANSLATION } from '../../../src/utils/const/translation';
import { AuthHelper } from '../../helpers/auth/AuthHelper';
import withAuthorization from '../../HOC/withAuthorization';
import { store } from '../../store/StoreMobx';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import { TNSOButton, TNSOInput, Variants } from '@tnso/ui-components/dist';
import { Controller, Form, useForm } from 'react-hook-form';
import Text from 'i18n-module/i18nModule';
import i18n from 'i18n-module/i18n';

const ForgotPasswordInternal = (): JSX.Element => {
  const { user } = store;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    control,
    getValues,
    reset,
    formState: { errors, isValid },
  } = useForm({ defaultValues: { email: '' }, mode: 'all' });

  const handleEmailSubmit = React.useCallback(
    async (data: { email: string }): Promise<void> => {
      await user.forgotPassword(data.email);
      navigate('/auth/login');
      reset({ email: '' });
    },
    [user, navigate]
  );

  const formRender = useMemo((): JSX.Element => {
    const data = getValues();
    return (
      <Form control={control}>
        <div className="form-group">
          <label htmlFor="email">
            <Text
              text={
                TRANSLATION.LOGIN.FORGOT
                  .pleaseEnterTheEmailAddressAssociatedWithYourAccount
              }
            />
          </label>
          <Controller
            name="email"
            control={control}
            rules={{
              required: true,
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            }}
            render={({ field }): JSX.Element => (
              <TNSOInput
                {...field}
                data-testid="email-input"
                placeholder={i18n.t(TRANSLATION.LOGIN.signIn)}
              />
            )}
          />
          {errors.email?.type === 'required' && (
            <p className="text-danger">
              <Text text={TRANSLATION.LOGIN.FORGOT.emailRequired} />
            </p>
          )}
          {errors.email?.type === 'pattern' && (
            <p className="text-danger">
              <Text text={TRANSLATION.LOGIN.emailMustBeValid} />
            </p>
          )}
        </div>
        <div className="form-group mt-2 mx-2">
          {/* eslint-disable-next-line react/jsx-no-bind  */}
          <TNSOButton
            data-testid="send-button"
            variant={Variants.Primary}
            disabled={!isValid}
            onClick={(): Promise<void> => handleEmailSubmit(data)}
          >
            <Text text={TRANSLATION.LOGIN.FORGOT.send} />
          </TNSOButton>
        </div>
      </Form>
    );
  }, [t, handleEmailSubmit, getValues, isValid, control, errors.email?.type]);

  return (
    <div className="forgot-container d-flex flex-column align-items-center justify-content-around justify-content-md-center m-auto">
      <h3 className="forgot-title">
        {t(TRANSLATION.LOGIN.FORGOT.forgotPasswordTitle)}
      </h3>
      {formRender}
    </div>
  );
};

// to get allowed roles for routes, use the route name from Router.tsx
const ForgotPassword = withAuthorization(
  observer(ForgotPasswordInternal),
  AuthHelper.getAllowedRolesForRoute('forgotPassword')
);

export default ForgotPassword;
