import { RawData } from "../../interfaces/devices/chart/chart";
import { COLORS } from "../../utils/const/colors";
import { CellularSignal, SignalQualityType, TechnologyType } from "../../interfaces/devices/cellular/cellularSignal";

export interface DataSerie {
  name: string;
  data: number;
}

export class DeviceSignalHelper {
  /**
   *
   * Creates an array of 5 transparent color values.
   * @type {string[]}
   *
   */
  static colors = Array.from(Array(5).keys()).map(() => COLORS.BARS.TRANSPARENT);
  /**
   *
   * Static object that defines the quality reference levels for a signal.
   * @property {number} noSignal - The value for no signal.
   * @property {Array<number>} poor - An array with the lower and upper bounds for poor signal quality.
   * @property {Array<number>} fair - An array with the lower and upper bounds for fair signal quality.
   * @property {Array<number>} good - An array with the lower and upper bounds for good signal quality.
   * @property {number} excellent - The value for excellent signal quality.
   * @property {string} current - The current signal quality level.
   *
   */
  static qualityReference = {
    noSignal: 0,
    poor: [1, 5],
    fair: [6, 12],
    good: [13, 19],
    excellent: 20,
    current: ""
  };
  /**
   *
   * A static property that represents the previous signal in a sequence.
   * @type {number}
   * @static
   *
   */
  static previousSignal = 0;
  static series: DataSerie[] = [];

  static normalizedSignalValues(signalValues: CellularSignal): CellularSignal {
    switch (signalValues.rssiSignalQuality) {
      case SignalQualityType.Excellent:
        return {
          ...signalValues,
          rssiAverage: 4
        };
      case SignalQualityType.Good:
        return {
          ...signalValues,
          rssiAverage: 3
        };
      case SignalQualityType.Fair:
        return {
          ...signalValues,
          rssiAverage: 2
        };
      case SignalQualityType.Poor:
        return {
          ...signalValues,
          rssiAverage: 1
        };
      default:
        return { ...signalValues, rssiAverage: 0 };
    }
  }

  /**
   * Calculates the moving average of an array of cellular signal values.
   *
   * @param {CellularSignal[]} signalValues - The array of cellular signal values.
   * @return {DataSerie[]} An array of data series representing the moving average.
   */
  static calculateMovingAverage(signalValues: CellularSignal[]): DataSerie[] {
    signalValues.forEach((signalValue: CellularSignal) => {
      const signal = this.normalizedSignalValues(signalValue);
      this.series.push({ name: `${signal.technologyType}`, data: signal.rssiAverage });
    });
    const result = this.series;
    this.series = [];
    return result;
  }

  /**
   * Extracts raw data from an array of CellularSignal objects.
   * @param signalValues - The array of CellularSignal objects.
   * @returns The raw data extracted from the signal values.
   */
  // eslint-disable-next-line
  static getRawData(signalValues: CellularSignal[]): any {
    const RawData: RawData = {
      time: [],
      data: [
        {
          technology: "2G",
          data: [
            {
              signalIndicator: "RSSI",
              signal: [],
              statusSignal: []
            }
          ]
        },
        {
          technology: "3G",
          data: [
            {
              signalIndicator: "RSSI",
              signal: [],
              statusSignal: []
            },
            {
              signalIndicator: "RSCP",
              signal: [],
              statusSignal: []
            },
            {
              signalIndicator: "EC/IO",
              signal: [],
              statusSignal: []
            }
          ]
        },
        {
          technology: "4G",
          data: [
            { signalIndicator: "RSSI", signal: [], statusSignal: [] },
            {
              signalIndicator: "RSRP",
              signal: [],
              statusSignal: []
            },
            {
              signalIndicator: "RSRQ",
              signal: [],
              statusSignal: []
            },
            {
              signalIndicator: "SINR",
              signal: [],
              statusSignal: []
            }
          ]
        }
      ]
    };

    signalValues.forEach((signalValue: CellularSignal) => {
      // TODO: See posibility to refactor this method
      switch (signalValue.technologyType) {
        case TechnologyType["2G"]:
          RawData.data[0].data[0].signal.push(signalValue.rssiAverage);
          RawData.data[0].data[0].statusSignal.push(signalValue.rssiSignalQuality);
          RawData.data[1].data[0].signal.push(" ");
          RawData.data[1].data[0].statusSignal.push(SignalQualityType.NoSignal);
          RawData.data[1].data[1].signal.push(" ");
          RawData.data[1].data[1].statusSignal.push(signalValue.rscpSignalQuality);
          RawData.data[1].data[2].signal.push(signalValue.ecioAverage < 1 ? " " : signalValue.ecioAverage);
          RawData.data[1].data[2].statusSignal.push(signalValue.ecioSignalQuality);
          RawData.data[2].data[0].signal.push(" ");
          RawData.data[2].data[0].statusSignal.push(SignalQualityType.NoSignal);
          RawData.data[2].data[1].signal.push(signalValue.rsrpAverage < 1 ? " " : signalValue.rsrpAverage);
          RawData.data[2].data[1].statusSignal.push(signalValue.rsrpSignalQuality);
          RawData.data[2].data[2].signal.push(signalValue.rsrqAverage < 1 ? " " : signalValue.rsrqAverage);
          RawData.data[2].data[2].statusSignal.push(signalValue.rsrqSignalQuality);
          RawData.data[2].data[3].signal.push(signalValue.sinrAverage < 1 ? " " : signalValue.sinrAverage);
          RawData.data[2].data[3].statusSignal.push(signalValue.sinrSignalQuality);
          break;
        case TechnologyType["3G"]:
          RawData.data[0].data[0].signal.push(" ");
          RawData.data[0].data[0].statusSignal.push(SignalQualityType.NoSignal);
          RawData.data[1].data[0].signal.push(signalValue.rssiAverage);
          RawData.data[1].data[0].statusSignal.push(signalValue.rssiSignalQuality);
          RawData.data[1].data[1].signal.push(signalValue.rscpAverage);
          RawData.data[1].data[1].statusSignal.push(signalValue.rscpSignalQuality);
          RawData.data[1].data[2].signal.push(signalValue.ecioAverage);
          RawData.data[1].data[2].statusSignal.push(signalValue.ecioSignalQuality);
          RawData.data[2].data[0].signal.push(" ");
          RawData.data[2].data[0].statusSignal.push(SignalQualityType.NoSignal);
          RawData.data[2].data[1].signal.push(signalValue.rsrpAverage < 1 ? " " : signalValue.rsrpAverage);
          RawData.data[2].data[1].statusSignal.push(signalValue.rsrpSignalQuality);
          RawData.data[2].data[2].signal.push(signalValue.rsrqAverage < 1 ? " " : signalValue.rsrqAverage);
          RawData.data[2].data[2].statusSignal.push(signalValue.rsrqSignalQuality);
          RawData.data[2].data[3].signal.push(signalValue.sinrAverage < 1 ? " " : signalValue.sinrAverage);
          RawData.data[2].data[3].statusSignal.push(signalValue.sinrSignalQuality);
          break;
        default:
          RawData.data[0].data[0].signal.push(" ");
          RawData.data[0].data[0].statusSignal.push(SignalQualityType.NoSignal);
          RawData.data[1].data[0].signal.push(" ");
          RawData.data[1].data[0].statusSignal.push(SignalQualityType.NoSignal);
          RawData.data[1].data[1].signal.push(signalValue.rscpAverage < 1 ? " " : signalValue.rscpAverage);
          RawData.data[1].data[1].statusSignal.push(signalValue.rscpSignalQuality);
          RawData.data[1].data[2].signal.push(signalValue.ecioAverage < 1 ? " " : signalValue.ecioAverage);
          RawData.data[1].data[2].statusSignal.push(signalValue.ecioSignalQuality);
          RawData.data[2].data[0].signal.push(signalValue.rssiAverage);
          RawData.data[2].data[0].statusSignal.push(signalValue.rssiSignalQuality);
          RawData.data[2].data[1].signal.push(signalValue.rsrpAverage);
          RawData.data[2].data[1].statusSignal.push(signalValue.rsrpSignalQuality);
          RawData.data[2].data[2].signal.push(signalValue.rsrqAverage);
          RawData.data[2].data[2].statusSignal.push(signalValue.rsrqSignalQuality);
          RawData.data[2].data[3].signal.push(signalValue.sinrAverage);
          RawData.data[2].data[3].statusSignal.push(signalValue.sinrSignalQuality);
      }
    });
    return RawData;
  }
}
