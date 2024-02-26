import axios from "axios";
import { StrapiApp } from "../../interfaces/user-guide/user-guide";

export const getMonitorings = async (): Promise<StrapiApp[]> => {
  try {
    const response = await axios.get("http://localhost:1337/api/monitorings");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching monitorings:", error);
    return [];
  }
};

export const putMonitorings = async (): Promise<StrapiApp[]> => {
  try {
    const response = await axios.put("http://localhost:1337/api/monitorings");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching monitorings:", error);
    return [];
  }
};

export const deleteMonitorings = async (): Promise<StrapiApp[]> => {
  try {
    const response = await axios.delete("http://localhost:1337/api/monitorings");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching monitorings:", error);
    return [];
  }
};

export const postMonitorings = async (): Promise<StrapiApp[]> => {
  try {
    const response = await axios.post("http://localhost:1337/api/monitorings");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching monitorings:", error);
    return [];
  }
};
