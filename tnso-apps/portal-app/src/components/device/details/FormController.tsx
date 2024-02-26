import React from 'react';
import {
  Control,
  Controller,
  FieldErrors,
  RegisterOptions,
} from 'react-hook-form';
import { DeviceAddress } from '../../../interfaces/devices/devices';
import { TNSOInput } from '@tnso/ui-components/dist';

export interface FormControllerProps {
  control: Control<DeviceAddress>;
  name:
    | 'latitude'
    | 'longitude'
    | 'street1'
    | 'street2'
    | 'city'
    | 'state'
    | 'zipCode'
    | 'countryCode';
  messages: string[];
  rules:
    | Omit<
        RegisterOptions<
          DeviceAddress,
          | 'latitude'
          | 'longitude'
          | 'street1'
          | 'street2'
          | 'city'
          | 'state'
          | 'zipCode'
          | 'countryCode'
        >,
        'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
      >
    | undefined;
  errors: FieldErrors;
  disabled?: boolean;
}

export function FormController({
  control,
  name,
  messages,
  rules,
  errors,
  disabled,
}: FormControllerProps): JSX.Element {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      /* eslint-disable-next-line */
      render={({ field }) => (
        <>
          <TNSOInput id={name} {...field} disabled={disabled} />
          {messages.map(
            (message) =>
              errors[name] && (
                <span className="text-danger" key={message}>
                  {message}
                </span>
              )
          )}
        </>
      )}
    />
  );
}
