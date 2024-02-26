import { Response } from "../../../interfaces/api/api";
import { Note } from "../../../interfaces/devices/note/note";
import { BaseService } from "../../BaseService";

export class NoteService extends BaseService {
  static async getAll(deviceName: string): Promise<Response<Note> | undefined> {
    return this.get<Note>(`devices/${deviceName}/note`);
  }
  static async update(note: Note, deviceName: string): Promise<Response<Note> | undefined> {
    return this.patch<Note>(`devices/${deviceName}/note`, note);
  }
}
