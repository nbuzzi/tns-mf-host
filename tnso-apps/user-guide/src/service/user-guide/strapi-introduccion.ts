import axios from "axios";
import { StrapiApp } from "../../interfaces/user-guide/user-guide";

export const getIntroductions = async (): Promise<StrapiApp[]> => {
  try {
    const response = await axios.get("http://localhost:1337/api/introductions");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching introductions:", error);
    return [];
  }
};

export const putIntroductions = async (): Promise<StrapiApp[]> => {
  try {
    const response = await axios.put("http://localhost:1337/api/introductions");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching introductions:", error);
    return [];
  }
};

export const deleteIntroductions = async (): Promise<StrapiApp[]> => {
  try {
    const response = await axios.delete("http://localhost:1337/api/introductions");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching introductions:", error);
    return [];
  }
};

export const postIntroductions = async (): Promise<StrapiApp[]> => {
  try {
    const response = await axios.post("http://localhost:1337/api/introductions");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching introductions:", error);
    return [];
  }
};
