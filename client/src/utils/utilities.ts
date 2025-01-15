const FindFileType = (url = "") => {
  const Extension = url.split(".").pop();

  if (
    Extension === "jpg" ||
    Extension === "jpeg" ||
    Extension === "png" ||
    Extension === "gif"
  ) {
    return "image";
  }

  if (
    Extension === "mp4" ||
    Extension === "mkv" ||
    Extension === "webm" ||
    Extension === "avi"
  ) {
    return "video";
  }

  if (
    Extension === "mp3" ||
    Extension === "wav" ||
    Extension === "ogg" ||
    Extension === "flac"
  ) {
    return "audio";
  } else {
    return "file";
  }
};

const transformImage = (url = "", size = 200) => {
  return url;
}

export { FindFileType, transformImage };
