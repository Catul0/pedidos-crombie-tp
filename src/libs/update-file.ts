import axios from "axios";

const uploadFile = async (file: File) => {
  let {
    data: { url, fileName },
  } = await axios.put(
    "https://g7os8mg446.execute-api.us-east-1.amazonaws.com/api/update-file-signature",
    {
      ext: "png",
    }
  );
  await axios.put(url, file, {
    headers: {
      "Content-type": file.type,
      "Access-Control-Allow-Origin": "*",
    },
  });
  return fileName as string;
};

export default uploadFile;