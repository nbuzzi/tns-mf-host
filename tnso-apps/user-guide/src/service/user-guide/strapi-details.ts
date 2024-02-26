import axios from "axios";
import { StrapiApp } from "../../interfaces/user-guide/user-guide";

export const getDeviceDetailsViews = async (): Promise<StrapiApp[]> => {
  try {
    const response = await axios.get("http://localhost:1337/api/device-details-views");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching device details views:", error);
    return [];
  }
};

export const putDeviceDetailsViews = async (): Promise<StrapiApp[]> => {
  try {
    const response = await axios.put("http://localhost:1337/api/device-details-views");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching device details views:", error);
    return [];
  }
};

export const postDeviceDetailsViews = async (): Promise<StrapiApp[]> => {
  try {
    const response = await axios.post("http://localhost:1337/api/device-details-views");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching device details views:", error);
    return [];
  }
};

export const deleteDeviceDetailsViews = async (): Promise<StrapiApp[]> => {
  try {
    const response = await axios.delete("http://localhost:1337/api/device-details-views");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching device details views:", error);
    return [];
  }
};
