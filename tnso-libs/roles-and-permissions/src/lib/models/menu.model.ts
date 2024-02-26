export interface IMenu {
  featureGroup: string;
  featureList: string[];
  featureFlag: boolean;
}

export interface IFeatureList {
  [key: string]: boolean;
  featureFlag: boolean;
}

export interface IFeatureFlag {
  [key: string]: boolean;
}
