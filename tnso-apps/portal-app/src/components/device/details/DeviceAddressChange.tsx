import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { DeviceAddress } from '../../../interfaces/devices/devices';
import { DeviceAddressForm } from './DeviceAddressForm';
import device from '../../../store/device/Device';
import { useParams, useNavigate } from 'react-router-dom';
import { MapperHelper } from '../../../helpers/shared/MapperHelper';
import { store } from '../../../store/StoreMobx';
import { useAsyncCall } from '../../../hooks/useAsyncCall';
import { TNSOCard } from '@tnso/ui-components/dist';

const DeviceAddressChange: React.FC = () => {
  const { detail } = store.device;
  const deviceAddress = detail.address;
  const [placeObj, setPlaceObj] = useState<google.maps.places.PlaceResult>();
  const { deviceName } = useParams();
  const navigate = useNavigate();

  const setValuesOptions = useMemo(
    () => ({ shouldValidate: true, shouldDirty: true }),
    [deviceName]
  );
  const initialValues = useMemo(() => {
    return {
      street1: deviceAddress?.street1 ?? '',
      street2: deviceAddress?.street2 ?? '',
      city: deviceAddress?.city ?? '',
      state: deviceAddress?.state ?? '',
      zipCode: deviceAddress?.zipCode ?? '',
      countryCode: deviceAddress?.countryCode ?? '',
      latitude: deviceAddress?.latitude ?? '',
      longitude: deviceAddress?.longitude ?? '',
    };
  }, [deviceAddress]);

  const {
    handleSubmit,
    setValue,
    formState: { errors, isDirty, isValid },
    control,
  } = useForm({
    defaultValues: initialValues,
    mode: 'all',
  });

  const loadData = useCallback(
    async (): Promise<void> => await detail.loadData(deviceName),
    [deviceName]
  );

  const mapAddress = useCallback((): void => {
    if (placeObj) {
      const newAddress = MapperHelper.mapSelectedNewAddress(placeObj);
      setValue('street1', newAddress.street1, setValuesOptions);
      setValue('city', newAddress.city, setValuesOptions);
      setValue('state', newAddress.state, setValuesOptions);
      setValue('zipCode', newAddress.zipCode, setValuesOptions);
      setValue('countryCode', newAddress.countryCode, setValuesOptions);
      setValue('latitude', newAddress.latitude, setValuesOptions);
      setValue('longitude', newAddress.longitude, setValuesOptions);
    }
  }, [placeObj, setValue, setValuesOptions]);

  const onSubmit = useCallback(
    async (data: FieldValues): Promise<void> => {
      if (deviceName) {
        const deviceAddressData = data as DeviceAddress;
        await device.updateDeviceAddress(deviceAddressData, deviceName);
        navigate(-1);
      }
    },
    [device, deviceName, navigate]
  );

  const handleCancel = useCallback((): void => {
    navigate(-1);
  }, [navigate]);

  useEffect(() => {
    mapAddress();
  }, [mapAddress]);

  useAsyncCall(loadData, []);

  const formRender = useMemo(
    () => (
      <DeviceAddressForm
        onSubmit={onSubmit}
        handleCancel={handleCancel}
        handleSubmit={handleSubmit}
        errors={errors}
        setPlaceObj={setPlaceObj}
        control={control}
        isValid={isValid}
      />
    ),
    [
      handleSubmit,
      onSubmit,
      handleCancel,
      errors.street1,
      setPlaceObj,
      isDirty,
      isValid,
      control,
    ]
  );

  return (
    <TNSOCard className="w-50 h-50">
      <div className="row">
        <div className="col">{formRender}</div>
      </div>
    </TNSOCard>
  );
};

export default DeviceAddressChange;
