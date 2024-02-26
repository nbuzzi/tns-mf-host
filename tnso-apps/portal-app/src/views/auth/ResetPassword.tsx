import React, { useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { TRANSLATION } from '../../../src/utils/const/translation';
import { AuthHelper } from '../../helpers/auth/AuthHelper';
import withAuthorization from '../../HOC/withAuthorization';
import Text from 'i18n-module/i18nModule';
import { store } from '../../store/StoreMobx';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';
import { ValidatorHelper } from '../../helpers/shared/ValidatorHelper';
import { useAsyncCall } from '../../hooks/useAsyncCall';
import { Controller, Form, useForm } from 'react-hook-form';
import {
  InputType,
  TNSOButton,
  TNSOInput,
  Variants,
} from '@tnso/ui-components/dist';

function ResetPasswordInternal(): JSX.Element {
  const { t, i18n } = useTranslation();
  const { user, shared } = store;
  const { guid } = useParams();
  const {
    control,
    getValues,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: { newPassword: '', confirmPassword: '' },
    mode: 'all',
  });

  const defaultLanguage = useCallback(async () => {
    await i18n.changeLanguage(shared.currentLanguage);
  }, [shared.currentLanguage]);

  useAsyncCall(defaultLanguage, []);

  const handleSubmit = useCallback(
    async (data: {
      newPassword: string;
      confirmPassword: string;
    }): Promise<void> => {
      if (guid) {
        await user.resetPassword(data.newPassword, guid);
        reset({ newPassword: '', confirmPassword: '' });
      }
    },
    [user, guid]
  );

  const formRender = useMemo(() => {
    const data = getValues();
    console.log(data);
    return (
      <Form control={control}>
        <div className="form-group-reset-password mb-2 position-relative">
          <label htmlFor="newPassword">
            <Text text={TRANSLATION.LOGIN.RESET.newPassword} />
          </label>
          <Controller
            name="newPassword"
            control={control}
            rules={{
              required: true,
              minLength: 12,
              validate: (value) =>
                ValidatorHelper.validatePassword(value || ''),
            }}
            render={({ field }): JSX.Element => (
              <TNSOInput {...field} type={InputType.Password} />
            )}
          />
          {errors.newPassword?.type === 'required' && (
            <p className="text-danger">
              <Text text={TRANSLATION.LOGIN.passwordRequired} />
            </p>
          )}
          {errors.newPassword?.type === 'minLength' && (
            <p className="text-danger">
              <Text text={TRANSLATION.LOGIN.RESET.passwordMin} />
            </p>
          )}
          {errors.newPassword?.type === 'validate' && (
            <p className="text-danger">
              <Text text={TRANSLATION.LOGIN.FORGOT.requiredFieldValidation} />
            </p>
          )}
        </div>
        <div className="form-group-reset-password mb-2 w-100">
          <label htmlFor="confirmPassword">
            <Text text={TRANSLATION.LOGIN.RESET.confirmPassword} />
          </label>
          <Controller
            name="confirmPassword"
            control={control}
            rules={{
              required: true,
              validate: (value) => value === data.newPassword,
            }}
            render={({ field }): JSX.Element => (
              <TNSOInput {...field} type={InputType.Password} />
            )}
          />
          {errors.confirmPassword?.type === 'required' && (
            <p className="text-danger">
              <Text text={TRANSLATION.LOGIN.passwordRequired} />
            </p>
          )}
          {errors.confirmPassword?.type === 'validate' && (
            <p className="text-danger">
              <Text text={TRANSLATION.LOGIN.RESET.passwordsMustBeTheSame} />
            </p>
          )}
        </div>
        <div className="form-group d-flex justify-content-end">
          <TNSOButton
            variant={Variants.Primary}
            disabled={!isValid}
            onClick={(): Promise<void> => handleSubmit(data)}
          >
            <Text text={TRANSLATION.LOGIN.RESET.submit} />
          </TNSOButton>
        </div>
      </Form>
    );
  }, [
    t,
    handleSubmit,
    control,
    getValues,
    errors.confirmPassword?.type,
    errors.newPassword?.type,
    isValid,
  ]);

  return (
    <div className="forgot-container d-flex flex-column align-items-center justify-content-around justify-content-md-center m-auto">
      <h3>
        <Text text={TRANSLATION.LOGIN.RESET.resetPassword} />
      </h3>
      {formRender}
    </div>
  );
}

// to get allowed roles for routes, use the route name from Router.tsx
const ResetPassword = withAuthorization(
  observer(ResetPasswordInternal),
  AuthHelper.getAllowedRolesForRoute('resetPassword')
);

export default ResetPassword;
