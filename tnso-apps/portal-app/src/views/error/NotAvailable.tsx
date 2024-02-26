import React from 'react';
import { Card } from 'react-bootstrap';
import { TRANSLATION } from '../../../src/utils/const/translation';
import Text from 'i18n-module/i18nModule';

const NotAvailable: React.FC = () => {
  return (
    <Card className="w-100 h-100 d-flex justify-content-center align-items-center p-5">
      <Card.Title className="mt-5">
        <Text text={TRANSLATION.ERROR.weAreSorry} />
      </Card.Title>
      <Card.Body className="mb-5">
        <Card.Text>
          <Text text={TRANSLATION.SHARED.general} />
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
export default NotAvailable;
