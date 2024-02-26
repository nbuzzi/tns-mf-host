import { DataSerie, DeviceSignalHelper } from "./DeviceSignalHelper";
import { CellularSignal, ServiceType, SignalQualityType, TechnologyType } from "../../interfaces/devices/cellular/cellularSignal";

describe("DeviceSignalHelper", () => {
  // Tests that the normalizedSignalValues() method correctly normalizes signal values for different technologies
  it("test_normalized_signal_values_happy_path", () => {
    const signalValues: CellularSignal[] = [
      {
        name: "tnspos00096v",
        dateTime: "1692741600",
        technologyType: TechnologyType["4G"],
        normLow: 36.0,
        normHigh: 36.0,
        normAverage: 36.0,
        rssiAverage: 76.333336,
        rsrpAverage: -106.2,
        rsrqAverage: -9.933333,
        rscpAverage: 0.0,
        ecioAverage: 0.0,
        sinrAverage: 0.0,
        rsrpCount: 1,
        rsrqCount: 1,
        rscpCount: 0,
        ecioCount: 0,
        sinrCount: 0,
        normSignalQuality: SignalQualityType.Excellent,
        rssiSignalQuality: SignalQualityType.Good,
        rsrpSignalQuality: SignalQualityType.NoSignal,
        rsrqSignalQuality: SignalQualityType.Excellent,
        rscpSignalQuality: SignalQualityType.NoSignal,
        ecioSignalQuality: SignalQualityType.NoSignal,
        sinrSignalQuality: SignalQualityType.NoSignal,
        modelName: "GW1152-QFL",
        service: ServiceType.LTE
      },
      {
        name: "tnspos00096v",
        dateTime: "1692756000",
        technologyType: TechnologyType["4G"],
        normLow: 38.0,
        normHigh: 38.0,
        normAverage: 38.0,
        rssiAverage: 74.125,
        rsrpAverage: -107.0625,
        rsrqAverage: -12.25,
        rscpAverage: 0.0,
        ecioAverage: 0.0,
        sinrAverage: 0.0,
        rsrpCount: 1,
        rsrqCount: 1,
        rscpCount: 0,
        ecioCount: 0,
        sinrCount: 0,
        normSignalQuality: SignalQualityType.Excellent,
        rssiSignalQuality: SignalQualityType.Excellent,
        rsrpSignalQuality: SignalQualityType.NoSignal,
        rsrqSignalQuality: SignalQualityType.Excellent,
        rscpSignalQuality: SignalQualityType.NoSignal,
        ecioSignalQuality: SignalQualityType.NoSignal,
        sinrSignalQuality: SignalQualityType.NoSignal,
        modelName: "GW1152-QFL",
        service: ServiceType.LTE
      },
      {
        name: "tnspos00096v",
        dateTime: "1692756000",
        technologyType: TechnologyType["4G"],
        normLow: 38.0,
        normHigh: 38.0,
        normAverage: 38.0,
        rssiAverage: 2,
        rsrpAverage: -107.0625,
        rsrqAverage: -12.25,
        rscpAverage: 0.0,
        ecioAverage: 0.0,
        sinrAverage: 0.0,
        rsrpCount: 1,
        rsrqCount: 1,
        rscpCount: 0,
        ecioCount: 0,
        sinrCount: 0,
        normSignalQuality: SignalQualityType.Excellent,
        rssiSignalQuality: SignalQualityType.Fair,
        rsrpSignalQuality: SignalQualityType.NoSignal,
        rsrqSignalQuality: SignalQualityType.Excellent,
        rscpSignalQuality: SignalQualityType.NoSignal,
        ecioSignalQuality: SignalQualityType.NoSignal,
        sinrSignalQuality: SignalQualityType.NoSignal,
        modelName: "GW1152-QFL",
        service: ServiceType.LTE
      },
      {
        name: "tnspos00096v",
        dateTime: "1692756000",
        technologyType: TechnologyType["4G"],
        normLow: 38.0,
        normHigh: 38.0,
        normAverage: 38.0,
        rssiAverage: 1,
        rsrpAverage: -107.0625,
        rsrqAverage: -12.25,
        rscpAverage: 0.0,
        ecioAverage: 0.0,
        sinrAverage: 0.0,
        rsrpCount: 1,
        rsrqCount: 1,
        rscpCount: 0,
        ecioCount: 0,
        sinrCount: 0,
        normSignalQuality: SignalQualityType.Excellent,
        rssiSignalQuality: SignalQualityType.Poor,
        rsrpSignalQuality: SignalQualityType.NoSignal,
        rsrqSignalQuality: SignalQualityType.Excellent,
        rscpSignalQuality: SignalQualityType.NoSignal,
        ecioSignalQuality: SignalQualityType.NoSignal,
        sinrSignalQuality: SignalQualityType.NoSignal,
        modelName: "GW1152-QFL",
        service: ServiceType.LTE
      },
      {
        name: "tnspos00096v",
        dateTime: "1692756000",
        technologyType: TechnologyType["4G"],
        normLow: 38.0,
        normHigh: 38.0,
        normAverage: 38.0,
        rssiAverage: 0,
        rsrpAverage: -107.0625,
        rsrqAverage: -12.25,
        rscpAverage: 0.0,
        ecioAverage: 0.0,
        sinrAverage: 0.0,
        rsrpCount: 1,
        rsrqCount: 1,
        rscpCount: 0,
        ecioCount: 0,
        sinrCount: 0,
        normSignalQuality: SignalQualityType.Excellent,
        rssiSignalQuality: SignalQualityType.NoSignal,
        rsrpSignalQuality: SignalQualityType.NoSignal,
        rsrqSignalQuality: SignalQualityType.Excellent,
        rscpSignalQuality: SignalQualityType.NoSignal,
        ecioSignalQuality: SignalQualityType.NoSignal,
        sinrSignalQuality: SignalQualityType.NoSignal,
        modelName: "GW1152-QFL",
        service: ServiceType.LTE
      }
    ];
    const expected: CellularSignal[] = [
      {
        name: "tnspos00096v",
        dateTime: "1692741600",
        technologyType: TechnologyType["4G"],
        normLow: 36.0,
        normHigh: 36.0,
        normAverage: 36.0,
        rssiAverage: 3,
        rsrpAverage: -106.2,
        rsrqAverage: -9.933333,
        rscpAverage: 0.0,
        ecioAverage: 0.0,
        sinrAverage: 0.0,
        rsrpCount: 1,
        rsrqCount: 1,
        rscpCount: 0,
        ecioCount: 0,
        sinrCount: 0,
        normSignalQuality: SignalQualityType.Excellent,
        rssiSignalQuality: SignalQualityType.Good,
        rsrpSignalQuality: SignalQualityType.NoSignal,
        rsrqSignalQuality: SignalQualityType.Excellent,
        rscpSignalQuality: SignalQualityType.NoSignal,
        ecioSignalQuality: SignalQualityType.NoSignal,
        sinrSignalQuality: SignalQualityType.NoSignal,
        modelName: "GW1152-QFL",
        service: ServiceType.LTE
      },
      {
        name: "tnspos00096v",
        dateTime: "1692756000",
        technologyType: TechnologyType["4G"],
        normLow: 38.0,
        normHigh: 38.0,
        normAverage: 38.0,
        rssiAverage: 4,
        rsrpAverage: -107.0625,
        rsrqAverage: -12.25,
        rscpAverage: 0.0,
        ecioAverage: 0.0,
        sinrAverage: 0.0,
        rsrpCount: 1,
        rsrqCount: 1,
        rscpCount: 0,
        ecioCount: 0,
        sinrCount: 0,
        normSignalQuality: SignalQualityType.Excellent,
        rssiSignalQuality: SignalQualityType.Excellent,
        rsrpSignalQuality: SignalQualityType.NoSignal,
        rsrqSignalQuality: SignalQualityType.Excellent,
        rscpSignalQuality: SignalQualityType.NoSignal,
        ecioSignalQuality: SignalQualityType.NoSignal,
        sinrSignalQuality: SignalQualityType.NoSignal,
        modelName: "GW1152-QFL",
        service: ServiceType.LTE
      },
      {
        name: "tnspos00096v",
        dateTime: "1692756000",
        technologyType: TechnologyType["4G"],
        normLow: 38.0,
        normHigh: 38.0,
        normAverage: 38.0,
        rssiAverage: 2,
        rsrpAverage: -107.0625,
        rsrqAverage: -12.25,
        rscpAverage: 0.0,
        ecioAverage: 0.0,
        sinrAverage: 0.0,
        rsrpCount: 1,
        rsrqCount: 1,
        rscpCount: 0,
        ecioCount: 0,
        sinrCount: 0,
        normSignalQuality: SignalQualityType.Excellent,
        rssiSignalQuality: SignalQualityType.Fair,
        rsrpSignalQuality: SignalQualityType.NoSignal,
        rsrqSignalQuality: SignalQualityType.Excellent,
        rscpSignalQuality: SignalQualityType.NoSignal,
        ecioSignalQuality: SignalQualityType.NoSignal,
        sinrSignalQuality: SignalQualityType.NoSignal,
        modelName: "GW1152-QFL",
        service: ServiceType.LTE
      },
      {
        name: "tnspos00096v",
        dateTime: "1692756000",
        technologyType: TechnologyType["4G"],
        normLow: 38.0,
        normHigh: 38.0,
        normAverage: 38.0,
        rssiAverage: 1,
        rsrpAverage: -107.0625,
        rsrqAverage: -12.25,
        rscpAverage: 0.0,
        ecioAverage: 0.0,
        sinrAverage: 0.0,
        rsrpCount: 1,
        rsrqCount: 1,
        rscpCount: 0,
        ecioCount: 0,
        sinrCount: 0,
        normSignalQuality: SignalQualityType.Excellent,
        rssiSignalQuality: SignalQualityType.Poor,
        rsrpSignalQuality: SignalQualityType.NoSignal,
        rsrqSignalQuality: SignalQualityType.Excellent,
        rscpSignalQuality: SignalQualityType.NoSignal,
        ecioSignalQuality: SignalQualityType.NoSignal,
        sinrSignalQuality: SignalQualityType.NoSignal,
        modelName: "GW1152-QFL",
        service: ServiceType.LTE
      },
      {
        name: "tnspos00096v",
        dateTime: "1692756000",
        technologyType: TechnologyType["4G"],
        normLow: 38.0,
        normHigh: 38.0,
        normAverage: 38.0,
        rssiAverage: 0,
        rsrpAverage: -107.0625,
        rsrqAverage: -12.25,
        rscpAverage: 0.0,
        ecioAverage: 0.0,
        sinrAverage: 0.0,
        rsrpCount: 1,
        rsrqCount: 1,
        rscpCount: 0,
        ecioCount: 0,
        sinrCount: 0,
        normSignalQuality: SignalQualityType.Excellent,
        rssiSignalQuality: SignalQualityType.NoSignal,
        rsrpSignalQuality: SignalQualityType.NoSignal,
        rsrqSignalQuality: SignalQualityType.Excellent,
        rscpSignalQuality: SignalQualityType.NoSignal,
        ecioSignalQuality: SignalQualityType.NoSignal,
        sinrSignalQuality: SignalQualityType.NoSignal,
        modelName: "GW1152-QFL",
        service: ServiceType.LTE
      }
    ];
    const result = signalValues.map((signalValue) => DeviceSignalHelper.normalizedSignalValues(signalValue));
    expect(result).toEqual(expected);
  });

  it("should calculate the moving average of an array of cellular signal values", () => {
    const signalValues: CellularSignal[] = [
      {
        name: "tnspos00096v",
        dateTime: "1692741600",
        technologyType: TechnologyType["4G"],
        normLow: 36.0,
        normHigh: 36.0,
        normAverage: 36.0,
        rssiAverage: 3,
        rsrpAverage: -106.2,
        rsrqAverage: -9.933333,
        rscpAverage: 0.0,
        ecioAverage: 0.0,
        sinrAverage: 0.0,
        rsrpCount: 1,
        rsrqCount: 1,
        rscpCount: 0,
        ecioCount: 0,
        sinrCount: 0,
        normSignalQuality: SignalQualityType.Excellent,
        rssiSignalQuality: SignalQualityType.Good,
        rsrpSignalQuality: SignalQualityType.NoSignal,
        rsrqSignalQuality: SignalQualityType.Excellent,
        rscpSignalQuality: SignalQualityType.NoSignal,
        ecioSignalQuality: SignalQualityType.NoSignal,
        sinrSignalQuality: SignalQualityType.NoSignal,
        modelName: "GW1152-QFL",
        service: ServiceType.LTE
      },
      {
        name: "tnspos00096v",
        dateTime: "1692756000",
        technologyType: TechnologyType["4G"],
        normLow: 38.0,
        normHigh: 38.0,
        normAverage: 38.0,
        rssiAverage: 4,
        rsrpAverage: -107.0625,
        rsrqAverage: -12.25,
        rscpAverage: 0.0,
        ecioAverage: 0.0,
        sinrAverage: 0.0,
        rsrpCount: 1,
        rsrqCount: 1,
        rscpCount: 0,
        ecioCount: 0,
        sinrCount: 0,
        normSignalQuality: SignalQualityType.Excellent,
        rssiSignalQuality: SignalQualityType.Excellent,
        rsrpSignalQuality: SignalQualityType.NoSignal,
        rsrqSignalQuality: SignalQualityType.Excellent,
        rscpSignalQuality: SignalQualityType.NoSignal,
        ecioSignalQuality: SignalQualityType.NoSignal,
        sinrSignalQuality: SignalQualityType.NoSignal,
        modelName: "GW1152-QFL",
        service: ServiceType.LTE
      }
    ];

    const expected: DataSerie[] = [
      { name: "4G", data: 3 },
      { name: "4G", data: 4 }
    ];

    const result = DeviceSignalHelper.calculateMovingAverage(signalValues);

    expect(result).toEqual(expected);
  });

  it("should return an empty array when no signal values are provided", () => {
    const signalValues: CellularSignal[] = [];

    const expected: DataSerie[] = [];

    const result = DeviceSignalHelper.calculateMovingAverage(signalValues);

    expect(result).toEqual(expected);
  });

  it("should extract raw data from an array of CellularSignal objects", () => {
    const signalValues: CellularSignal[] = [
      {
        name: "tnspos00096v",
        dateTime: "1692741600",
        technologyType: TechnologyType["4G"],
        normLow: 36.0,
        normHigh: 36.0,
        normAverage: 36.0,
        rssiAverage: 76.333336,
        rsrpAverage: -106.2,
        rsrqAverage: -9.933333,
        rscpAverage: 0.0,
        ecioAverage: 0.0,
        sinrAverage: 0.0,
        rsrpCount: 1,
        rsrqCount: 1,
        rscpCount: 0,
        ecioCount: 0,
        sinrCount: 0,
        normSignalQuality: SignalQualityType.Excellent,
        rssiSignalQuality: SignalQualityType.Good,
        rsrpSignalQuality: SignalQualityType.NoSignal,
        rsrqSignalQuality: SignalQualityType.Excellent,
        rscpSignalQuality: SignalQualityType.NoSignal,
        ecioSignalQuality: SignalQualityType.NoSignal,
        sinrSignalQuality: SignalQualityType.NoSignal,
        modelName: "GW1152-QFL",
        service: ServiceType.LTE
      }
    ];

    const expectedRawData = {
      time: [],
      data: [
        {
          technology: "2G",
          data: [
            {
              signalIndicator: "RSSI",
              signal: [" "],
              statusSignal: [SignalQualityType.NoSignal]
            }
          ]
        },
        {
          technology: "3G",
          data: [
            {
              signalIndicator: "RSSI",
              signal: [" "],
              statusSignal: [SignalQualityType.NoSignal]
            },
            {
              signalIndicator: "RSCP",
              signal: [" "],
              statusSignal: [SignalQualityType.NoSignal]
            },
            {
              signalIndicator: "EC/IO",
              signal: [" "],
              statusSignal: [SignalQualityType.NoSignal]
            }
          ]
        },
        {
          technology: "4G",
          data: [
            { signalIndicator: "RSSI", signal: [76.333336], statusSignal: [SignalQualityType.Good] },
            {
              signalIndicator: "RSRP",
              signal: [-106.2],
              statusSignal: [SignalQualityType.NoSignal]
            },
            {
              signalIndicator: "RSRQ",
              signal: [-9.933333],
              statusSignal: [SignalQualityType.Excellent]
            },
            {
              signalIndicator: "SINR",
              signal: [0],
              statusSignal: [SignalQualityType.NoSignal]
            }
          ]
        }
      ]
    };

    const result = DeviceSignalHelper.getRawData(signalValues);
    expect(result).toEqual(expectedRawData);
  });

  it("should extract raw data for 2G technology", () => {
    const signalValues: CellularSignal[] = [
      {
        name: "tnspos00096v",
        dateTime: "1692741600",
        normLow: 36.0,
        normHigh: 36.0,
        normAverage: 36.0,
        technologyType: TechnologyType["2G"],
        rssiAverage: 76.333336,
        rssiSignalQuality: SignalQualityType.Good,
        rscpSignalQuality: SignalQualityType.NoSignal,
        ecioAverage: 0.0,
        ecioSignalQuality: SignalQualityType.NoSignal,
        rsrpAverage: -106.2,
        rsrpCount: 1,
        rsrqCount: 1,
        rscpCount: 0,
        ecioCount: 0,
        sinrCount: 0,
        rscpAverage: 0.0,
        rsrpSignalQuality: SignalQualityType.NoSignal,
        rsrqAverage: -9.933333,
        rsrqSignalQuality: SignalQualityType.Excellent,
        sinrAverage: 0.0,
        sinrSignalQuality: SignalQualityType.NoSignal,
        normSignalQuality: SignalQualityType.Excellent,
        modelName: "GW1152-QFL",
        service: ServiceType.LTE
      }
    ];

    const expectedRawData = {
      time: [],
      data: [
        {
          technology: "2G",
          data: [
            {
              signalIndicator: "RSSI",
              signal: [76.333336],
              statusSignal: [SignalQualityType.Good]
            }
          ]
        },
        {
          technology: "3G",
          data: [
            {
              signalIndicator: "RSSI",
              signal: [" "],
              statusSignal: [SignalQualityType.NoSignal]
            },
            {
              signalIndicator: "RSCP",
              signal: [" "],
              statusSignal: [SignalQualityType.NoSignal]
            },
            {
              signalIndicator: "EC/IO",
              signal: [" "],
              statusSignal: [SignalQualityType.NoSignal]
            }
          ]
        },
        {
          technology: "4G",
          data: [
            {
              signalIndicator: "RSSI",
              signal: [" "],
              statusSignal: [SignalQualityType.NoSignal]
            },
            {
              signalIndicator: "RSRP",
              signal: [" "],
              statusSignal: [SignalQualityType.NoSignal]
            },
            {
              signalIndicator: "RSRQ",
              signal: [" "],
              statusSignal: [SignalQualityType.Excellent]
            },
            {
              signalIndicator: "SINR",
              signal: [" "],
              statusSignal: [SignalQualityType.NoSignal]
            }
          ]
        }
      ]
    };

    const result = DeviceSignalHelper.getRawData(signalValues);
    expect(result).toEqual(expectedRawData);
  });

  it("should extract raw data for 3G technology", () => {
    const signalValues: CellularSignal[] = [
      {
        name: "tnspos00096v",
        dateTime: "1692741600",
        normLow: 36.0,
        normHigh: 36.0,
        normAverage: 36.0,
        technologyType: TechnologyType["3G"],
        rssiAverage: 76.333336,
        rsrpCount: 1,
        rsrqCount: 1,
        rscpCount: 0,
        ecioCount: 0,
        sinrCount: 0,
        normSignalQuality: SignalQualityType.NoSignal,
        rssiSignalQuality: SignalQualityType.Good,
        rscpAverage: -106.2,
        rscpSignalQuality: SignalQualityType.NoSignal,
        ecioAverage: 0.0,
        ecioSignalQuality: SignalQualityType.NoSignal,
        rsrpAverage: -107.0625,
        rsrpSignalQuality: SignalQualityType.NoSignal,
        rsrqAverage: -12.25,
        rsrqSignalQuality: SignalQualityType.Excellent,
        sinrAverage: 0.0,
        sinrSignalQuality: SignalQualityType.NoSignal,
        service: ServiceType.LTE,
        modelName: "GW1152-QFL"
      }
    ];

    const expectedRawData = {
      time: [],
      data: [
        {
          technology: "2G",
          data: [
            {
              signalIndicator: "RSSI",
              signal: [" "],
              statusSignal: [SignalQualityType.NoSignal]
            }
          ]
        },
        {
          technology: "3G",
          data: [
            {
              signalIndicator: "RSSI",
              signal: [76.333336],
              statusSignal: [SignalQualityType.Good]
            },
            {
              signalIndicator: "RSCP",
              signal: [-106.2],
              statusSignal: [SignalQualityType.NoSignal]
            },
            {
              signalIndicator: "EC/IO",
              signal: [0],
              statusSignal: [SignalQualityType.NoSignal]
            }
          ]
        },
        {
          technology: "4G",
          data: [
            {
              signalIndicator: "RSSI",
              signal: [" "],
              statusSignal: [SignalQualityType.NoSignal]
            },
            {
              signalIndicator: "RSRP",
              signal: [" "],
              statusSignal: [SignalQualityType.NoSignal]
            },
            {
              signalIndicator: "RSRQ",
              signal: [" "],
              statusSignal: [SignalQualityType.Excellent]
            },
            {
              signalIndicator: "SINR",
              signal: [" "],
              statusSignal: [SignalQualityType.NoSignal]
            }
          ]
        }
      ]
    };

    const result = DeviceSignalHelper.getRawData(signalValues);
    expect(result).toEqual(expectedRawData);
  });
});