import React from "react";
import { useAsyncCall } from "../../../hooks/useAsyncCallShared";
import { Spinner } from "react-bootstrap";
import { observer } from "mobx-react";

import "./TextValidation.scss";

export enum TextValidationType {
  companyName = "Name",
  email = "Email",
  username = "UserName"
}

export interface TextValidationProps {
  text: string;
  message: string;
  type: TextValidationType;
  isProgress: boolean;
  isAvailable: boolean;
}

export const TextValidation: React.FC<TextValidationProps> = observer(({ message, type, isProgress, isAvailable }): JSX.Element => {
  const [showText, setShowText] = React.useState<boolean>(false);
  const [messageStatus, setMessageStatus] = React.useState<string>(message);

  useAsyncCall(async () => {
    if (type === TextValidationType.companyName) {
      if (isAvailable) {
        setMessageStatus(`${type} is available`);
        setShowText(true);
      } else {
        setMessageStatus(`${type} is already taken`);
        setShowText(true);
      }
    }
    if (type === TextValidationType.email) {
      if (isAvailable) {
        setMessageStatus(`${type} is available`);
        setShowText(true);
      } else {
        setMessageStatus(`${type} is already taken`);
        setShowText(true);
      }
    }
    if (type === TextValidationType.username) {
      if (isAvailable) {
        setMessageStatus(`${type} is available`);
        setShowText(true);
      } else {
        setMessageStatus(`${type} is already taken`);
        setShowText(true);
      }
    }
  }, [type, isAvailable]);

  return (
    <div className="container" data-testid="text-validation-component">
      {isProgress ? (
        <small className="text" data-testid="text-validation-component">
          <Spinner size="sm" data-testid="text-validation-spinner" />
        </small>
      ) : (
        showText && <small className={`text ${isAvailable ? "success" : "error"}`}>{messageStatus}</small>
      )}
    </div>
  );
});
