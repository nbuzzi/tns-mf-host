import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TRANSLATION } from '../../../../../../utils/const/translation';
import { useParams } from 'react-router-dom';
import { useAsyncCall } from '../../../../../../hooks/useAsyncCall';
import { Note } from '../../../../../../interfaces/devices/note/note';
import { store } from '../../../../../../store/StoreMobx';
import { observer } from 'mobx-react';
import './Notes.scss';
import {
  TNSOButton,
  Variants,
  TNSOCard,
  TNSOTextarea,
} from '@tnso/ui-components/dist';
import Text from 'i18n-module/i18nModule';

export const Notes: React.FC = observer(() => {
  const { t } = useTranslation();
  const { device } = store;
  const { deviceName } = useParams();
  const maxNoteLength = 500;

  const [note, setNote] = useState<Note>({
    note: '',
  });

  const loadData = useCallback(async () => {
    await device.note.loadData(deviceName);
  }, [deviceName, device.note]);

  useEffect(() => {
    if (device.note.data) {
      setNote({
        note: device.note.data.note,
      });
    }
  }, [setNote, device.note.data]);

  const loader = useAsyncCall(loadData, [loadData]);

  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) =>
      setNote({ note: event.target.value }),
    [setNote]
  );

  const onClick = useCallback(async () => {
    if (deviceName) {
      await device.note.update(note, deviceName);
    }
  }, [deviceName, note, device.note]);

  return loader.completed ? (
    <TNSOCard className="d-flex flex-column gap-3">
      <TNSOTextarea
        value={note.note}
        onChange={handleOnChange}
        maxLength={maxNoteLength}
        rows={8}
      />
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <TNSOButton variant={Variants.Primary} onClick={onClick}>
          <Text
            text={t(
              TRANSLATION.SHARED.update
            )}
          />
        </TNSOButton>
      </div>
    </TNSOCard>
  ) : null;
});
