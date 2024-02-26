import axios from "axios";
import { StrapiApp } from "../../interfaces/user-guide/user-guide";

export const getDevices = async (): Promise<StrapiApp[]> => {
  try {
    const response = await axios.get("http://localhost:1337/api/devices");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching devices:", error);
    return [];
  }
};

export const putDevices = async (): Promise<StrapiApp[]> => {
  try {
    const response = await axios.put("http://localhost:1337/api/devices");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching devices:", error);
    return [];
  }
};

export const deleteDevices = async (): Promise<StrapiApp[]> => {
  try {
    const response = await axios.delete("http://localhost:1337/api/devices");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching devices:", error);
    return [];
  }
};

export const postDevices = async (): Promise<StrapiApp[]> => {
  try {
    const response = await axios.post("http://localhost:1337/api/devices");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching devices:", error);
    return [];
  }
};
