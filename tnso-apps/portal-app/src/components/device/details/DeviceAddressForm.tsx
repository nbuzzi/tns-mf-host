import React, { useCallback } from 'react';
import { Form } from 'react-bootstrap';
import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormHandleSubmit,
} from 'react-hook-form';
import { DeviceAddress } from '../../../interfaces/devices/devices';
import { GoogleHelper } from '../../../helpers/api/GoogleHelper';
import { useAsyncCall } from '../../../hooks/useAsyncCallShared';
import { TRANSLATION } from '../../../utils/const/translation';
import { useTranslation } from 'react-i18next';
import { FormController } from './FormController';
import { TNSOButton, Variants } from '@tnso/ui-components/dist';

interface Props {
  onSubmit: (data: FieldValues) => void;
  handleCancel: () => void;
  handleSubmit: UseFormHandleSubmit<DeviceAddress, undefined>;
  errors: FieldErrors<DeviceAddress>;
  setPlaceObj: (place: google.maps.places.PlaceResult) => void;
  control: Control<DeviceAddress>;
  isValid: boolean;
}

export const DeviceAddressForm: React.FC<Props> = ({
  onSubmit,
  handleCancel,
  handleSubmit,
  errors,
  setPlaceObj,
  control,
  isValid,
}) => {
  const { t } = useTranslation();

  const setupGooglePlaces = useCallback(
    async () => await GoogleHelper.getPlaces('street1', handlePlaceSelection),
    []
  );

  useAsyncCall(setupGooglePlaces, []);

  const handlePlaceSelection = useCallback(
    (place: google.maps.places.PlaceResult): void => {
      setPlaceObj(place);
    },
    [setPlaceObj]
  );

  const checkKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLFormElement>): void => {
      if (e.key.toLowerCase() === 'enter') {
        e.preventDefault();
      }
    },
    []
  );

  return (
    <Form onSubmit={handleSubmit(onSubmit)} onKeyDown={checkKeyDown}>
      <div className="form-group-row mb-4">
        <label htmlFor="street1">
          {t(
            TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICECONFIGURATION
              .streetAddress
          ) + ' 1'}
        </label>
        <FormController
          control={control}
          name="street1"
          messages={[t(TRANSLATION.ERROR.invalidAddress)]}
          rules={{ pattern: /^\d+\s+.+$/, required: true }}
          errors={errors}
        />
      </div>
      <div className="form-group-row mb-4">
        <label htmlFor="street2">
          {t(
            TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICECONFIGURATION
              .streetAddress
          ) + ' 2'}
        </label>
        <FormController
          control={control}
          name="street2"
          messages={[t(TRANSLATION.ERROR.addressTooLong)]}
          rules={{ maxLength: 60 }}
          errors={errors}
        />
      </div>
      <div className="form-group-row mb-4">
        <label htmlFor="city">
          {t(TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICECONFIGURATION.city)}
        </label>
        <FormController
          disabled={true}
          control={control}
          name="city"
          messages={[t(TRANSLATION.ERROR.requiredField)]}
          rules={{ required: true }}
          errors={errors}
        />
      </div>
      <div className="form-group-row mb-4">
        <label htmlFor="state">
          {t(TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICECONFIGURATION.state)}
        </label>
        <FormController
          disabled={true}
          control={control}
          name="state"
          messages={[t(TRANSLATION.ERROR.requiredField)]}
          rules={{ required: true }}
          errors={errors}
        />
      </div>
      <div className="form-group-row mb-4">
        <label htmlFor="zipCode">
          {t(
            TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICECONFIGURATION.zipCode
          )}
        </label>
        <FormController
          disabled={true}
          control={control}
          name="zipCode"
          messages={[t(TRANSLATION.ERROR.requiredField)]}
          rules={{ required: true }}
          errors={errors}
        />
      </div>
      <div className="form-group-row mb-4">
        <label htmlFor="country">
          {t(
            TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICECONFIGURATION.country
          )}
        </label>
        <FormController
          disabled={true}
          control={control}
          name="countryCode"
          messages={[t(TRANSLATION.ERROR.requiredField)]}
          rules={{ required: true }}
          errors={errors}
        />
      </div>
      <div className="form-group d-flex gap-2 justify-content-end">
        <TNSOButton
          variant={Variants.Primary}
          disabled={!isValid}
        >
          {t(TRANSLATION.SHARED.BUTTON.save)}
        </TNSOButton>
        <TNSOButton
          variant={Variants.Secondary}
          onClick={handleCancel}
        >
          {t(TRANSLATION.SHARED.BUTTON.cancel)}
        </TNSOButton>
      </div>
    </Form>
  );
};
