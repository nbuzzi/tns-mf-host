import { makeAutoObservable } from "mobx";
import { StatusCode } from "../../../helpers/api/RequestHelper";
import { MessageHelper } from "../../../helpers/shared/MessageHelper";
import { Note as NoteModel } from "../../../interfaces/devices/note/note";
import { NoteService } from "../../../service/device/deviceDetail/NoteService";
import { TRANSLATION } from "../../../utils/const/translation";
import { i18nInstance as i18n } from "../../../i18n";

export interface INote {
  data?: NoteModel;
  deviceName?: string;

  loadData: (tnsDeviceName?: string) => Promise<void>;
  update: (note: NoteModel, tnsDeviceName?: string) => Promise<void>;
}

class Note implements INote {
  data?: NoteModel = undefined;
  deviceName?: string | undefined;

  constructor() {
    makeAutoObservable(this);
  }

  loadData = async (tnsDeviceName?: string): Promise<void> => {
    try {
      if (tnsDeviceName && tnsDeviceName !== this.deviceName) {
        this.deviceName = tnsDeviceName;
        const response = await NoteService.getAll(tnsDeviceName);
        if (response?.status === StatusCode.OK && response?.data) {
          this.data = response.data.note === null ? { note: "" } : response.data;
        }
      }
    } catch (error) {
      MessageHelper.errorMessage(i18n.t(TRANSLATION.MODAL.ALERT.errorLoading));
    }
  };

  update = async (note: NoteModel, tnsDeviceName?: string): Promise<void> => {
    try {
      if (tnsDeviceName) {
        const response = await NoteService.update(note, tnsDeviceName);
        if (response?.status === StatusCode.NO_CONTENT) {
          MessageHelper.successMessage(i18n.t(TRANSLATION.MODAL.ALERT.successUpdate));
          const response = await NoteService.getAll(tnsDeviceName);
          if (response?.status === StatusCode.OK && response?.data) {
            this.data = response.data;
            this.deviceName = tnsDeviceName;
          }
        }
      }
    } catch (error) {
      MessageHelper.errorMessage(i18n.t(TRANSLATION.MODAL.ALERT.errorCreating));
    }
  };
}

const note = new Note();

export default note;
