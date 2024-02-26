import React, { useCallback } from "react";
import { Controller, ControllerFieldState, ControllerRenderProps, FieldValues, RegisterOptions, useForm } from "react-hook-form";

interface InputProps {
  id: string;
  rules?: Partial<RegisterOptions>;
  defaultValue?: string;
  disabled?: boolean;
}

export const FormInput: React.FC<InputProps> = ({ id, rules, defaultValue, disabled }) => {
  const { control } = useForm();

  const renderInput = useCallback(({ field, fieldState }: { field: ControllerRenderProps<FieldValues, string>; fieldState: ControllerFieldState; }) => {
    return (
      <>
        <input className={"form-control"} id={id} defaultValue={defaultValue} disabled={disabled} {...field}/>
        {fieldState.error && <span className="text-danger">{fieldState.error.message}</span>}
      </>
    );
  }, []);


  return <Controller name={id} control={control} rules={rules} render={renderInput} />;
};
