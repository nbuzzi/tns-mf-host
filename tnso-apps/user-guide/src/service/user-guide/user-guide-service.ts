import axios from "axios";
import { StrapiApp } from "../../interfaces/user-guide/user-guide";

export const getLvc = async (): Promise<StrapiApp[]> => {
  try {
    const response = await axios.get("http://localhost:1337/api/lvcs");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching user guides:", error);
    return [];
  }
};

export const postlvcs = async (): Promise<StrapiApp[]> => {
  try {
    const response = await axios.post("http://localhost:1337/api/lvcs");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching user guides:", error);
    return [];
  }
};

export const putLvcs = async (): Promise<StrapiApp[]> => {
  try {
    const response = await axios.put("http://localhost:1337/api/lvcs");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching user guides:", error);
    return [];
  }
};

export const deleteLvcs = async (): Promise<StrapiApp[]> => {
  try {
    const response = await axios.delete("http://localhost:1337/api/lvcs");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching user guides:", error);
    return [];
  }
};
