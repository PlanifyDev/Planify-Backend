import axios from "axios";
import { AiProjectResponse, AiVersionResponse } from "../contracts/types";

export const createNewProject = async (
  boundary: Object,
  door_position: Object
): Promise<AiProjectResponse> => {
  const url = "http://localhost:5000/design";
  try {
    // const res = await axios.post(url, boundary, {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    // return Promise.resolve(res.data);
    return Promise.resolve({
      project_img: "project_img",
      project_icon: "project_icon",
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createNewVersion = async (
  boundary: Object,
  door_position: Object,
  constrains: Object
): Promise<AiVersionResponse> => {
  const url = "http://localhost:5000/design";
  try {
    // const res = await axios.post(url, boundary, {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    // return Promise.resolve(res.data);
    return Promise.resolve({
      version_img: "version_img",
      version_icon: "version_icon",
    });
  } catch (error) {
    return Promise.reject(error);
  }
};
