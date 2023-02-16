import axios from "axios";

type AiResponse = {
  project_img: string;
  project_icon: string;
  version_img: string;
  version_icon: string;
};

export const createNewProject = async (
  boundary: Object
): Promise<AiResponse> => {
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
      version_img: "version_img",
      version_icon: "version_icon",
    });
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};
