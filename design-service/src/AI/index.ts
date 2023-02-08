import axios from "axios";

type AiResponse = {
  project_image: string;
  version_image: string;
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
      project_image: "https://picsum.photos/200",
      version_image: "https://picsum.photos/200",
    });
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};
