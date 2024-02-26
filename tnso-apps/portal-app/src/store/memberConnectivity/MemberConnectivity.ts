import { makeAutoObservable } from 'mobx';
import {
  AcnaStatus,
  ConnectedMember,
  ExportMember,
  MembersResponse,
  MemberConnectivityParams,
  Member as MemberModel,
  MembersExportResponse,
  MembersGraphResponse,
  HasMemberConnectivity,
  HasMemberDevice,
  MemberConnectivityDeviceName,
} from '../../interfaces/memberConnectivity/memberConnectivity';
import { MemberConnectivityService } from '../../service/memberConnectivity/MemberConnectivityService';
import { MemberHelper } from '../../helpers/member/MemberHelper';
import { StatusCode } from '../../helpers/api/RequestHelper';
import { MemberExportService } from '../../service/memberConnectivity/MemberExportService';

export interface IMemberConnectivity {
  data?: MembersResponse;
  member?: MemberModel[];
  membersGraph: MembersGraphResponse;
  connectedMember?: ConnectedMember[];
  exportData?: MembersExportResponse;
  exportMember?: ExportMember[];
  hasMemberConnectivity?: HasMemberConnectivity;
  hasMemberDevice?: HasMemberDevice;
  selectedItem: string;

  loadData: (acna?: string, params?: MemberConnectivityParams) => Promise<void>;
  loadDataExport: (params?: MemberConnectivityParams) => Promise<void>;
  loadMembersGraph: (acna?: string) => Promise<void>;
  clearData: () => void;
  clearMembersGraph: () => void;
  loadHasMemberConnectivity: () => Promise<void>;
  loadHasMemberDevice: (
    tnsDeviceName: string,
    params?: MemberConnectivityDeviceName
  ) => Promise<void>;
}

class MemberConnectivity implements IMemberConnectivity {
  data?: MembersResponse = undefined;
  member?: MemberModel[] = undefined;
  membersGraph: MembersGraphResponse = {
    connectedMembers: [],
    srcAcna: '',
    srcKnownAs: '',
    srcAcnaStatus: AcnaStatus.offline,
  };
  hasMemberConnectivity?: HasMemberConnectivity = undefined;
  hasMemberDevice?: HasMemberDevice = undefined;
  connectedMember?: ConnectedMember[] = undefined;
  exportData?: MembersExportResponse = undefined;
  exportMember?: ExportMember[] = undefined;
  selectedItem = '';

  constructor() {
    makeAutoObservable(this);
  }

  loadData = async (acna?: string): Promise<void> => {
    this.selectedItem = acna || '';
    try {
      const response = await MemberConnectivityService.getAll(acna);
      if (response?.data) {
        this.data = response.data;
        this.member = response.data.members;
      }
    } catch (error) {
      console.log(error);
    }
  };

  loadDataExport = async (params?: MemberConnectivityParams): Promise<void> => {
    try {
      const response = await MemberExportService.getAll(params);
      if (response?.data) {
        this.exportData = response.data;
        this.exportMember = response.data.members;
      }
    } catch (error) {
      console.log(error);
    }
  };

  clearData = (): void => {
    this.data = undefined;
  };

  clearMembersGraph = (): void => {
    this.connectedMember = undefined;
  };

  loadMembersGraph = async (acna?: string): Promise<void> => {
    try {
      const response = await MemberConnectivityService.getConnectedGraph(acna);
      if (response?.data && response.status === StatusCode.OK) {
        const connectedMembers = response.data.connectedMembers.map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (member: any) => {
            const connectivityStatus = MemberHelper.modifyStatus(
              member.memberConnectivityStatus
            );
            return { ...member, memberConnectivityStatus: connectivityStatus };
          }
        );
        const membersGraph = {
          ...response.data,
          connectedMembers,
        };
        this.membersGraph = membersGraph as MembersGraphResponse;
        this.connectedMember = connectedMembers as ConnectedMember[];
      }
      if (response && response.status === StatusCode.NOT_FOUND) {
        this.membersGraph = {
          connectedMembers: [],
          srcAcna: '',
          srcKnownAs: '',
          srcAcnaStatus: AcnaStatus.fullService,
        };
      }
    } catch (error) {
      this.membersGraph = {
        connectedMembers: [],
        srcAcna: '',
        srcKnownAs: '',
        srcAcnaStatus: AcnaStatus.fullService,
      };
    }
  };

  loadHasMemberConnectivity = async (): Promise<void> => {
    try {
      const response =
        await MemberConnectivityService.getHasMemberConnectivity();
      if (response?.data) {
        this.hasMemberConnectivity = response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  loadHasMemberDevice = async (
    tnsDeviceName: string,
    params?: MemberConnectivityDeviceName
  ): Promise<void> => {
    try {
      const response = await MemberConnectivityService.getHasMemberDevice(
        tnsDeviceName
      );
      if (response?.data) {
        this.hasMemberDevice = response.data;
      }
    } catch (error) {
      console.error('Error loading member device:', error);
    }
  };
}

const membersConnectivity = new MemberConnectivity();

export default membersConnectivity;
