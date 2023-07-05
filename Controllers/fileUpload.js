const File = require("../Models/File");

const cloudinary = require("cloudinary");

function isFileSupported(type, supportedType) {
  return supportedType.includes(type);
}

//* function for cloudinary upload

async function uploadFileCloudinary(file, folder, quality) {
  const options = { folder };

  if (quality) {
    options.quality = quality;
  }

  options.resource_type = "auto";
  return await cloudinary.v2.uploader.upload(file.tempFilePath, options);
}

// local file upload handler function

exports.localFileUpload = async (req, res) => {
  try {
    // fetch file
    const file = req.files.file;
    console.log("File recived =>", file);

    // server path
    let path =
      __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;
    console.log("Path => ", path);

    // add path to the move function
    file.mv(path, (error) => {
      console.log(error);
    });

    // create a successful response
    res.json({
      success: true,
      message: "local file Uploaded Sucessfully",
    });
  } catch (error) {
    console.log(error);
  }
};

// function for file type supported

// image upload handler

exports.imageUpload = async (req, res) => {
  try {
    // data fetch
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.imageFile;
    console.log(file);

    // validation
    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();

    // file format not supported
    if (!isFileSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "File format not supported",
      });
    }

    // file format supported
    const response = await uploadFileCloudinary(file, "codeHelp_fileUpload");

    console.log(response);

    // db entry save
    const fileData = await File.create({
      name,
      email,
      tags,
      imgUrl: response.secure_url,
    });

    res.json({
      success: true,
      imageUrl: response.secure_url,
      message: "Image uploaded successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "something went wrong",
    });
  }
};

// vido upload handler

exports.videoUpload = async (req, res) => {
  try {
    // fetch data
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.videoFile;
    console.log(file);

    // validation
    const supportedTypes = ["mp4", "mpov"];
    const fileType = file.name.split(".")[1].toLowerCase();

    // Check if file format is not supported or size exceeds 5MB
    if (
      !isFileSupported(fileType, supportedTypes) ||
      file.size > 5 * 1024 * 1024
    ) {
      return res.status(400).json({
        success: false,
        message:
          "File format not supported or file size exceeds the limit of 5MB",
      });
    }
    // file format supported
    const response = await uploadFileCloudinary(file, "codeHelp_fileUpload");

    console.log(response);

    // db entry save
    const fileData = await File.create({
      name,
      email,
      tags,
      imgUrl: response.secure_url,
    });

    res.json({
      success: true,
      imgUrl: response.secure_url,
      message: "Image uploaded successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "something went wrong",
    });
  }
};

// video upload

exports.videoUpload = async (req, res) => {
  try {
    // fetch data
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.videoFile;
    console.log(file);

    // validation
    const supportedTypes = ["mp4", "mov"];
    const fileType = file.name.split(".")[1].toLowerCase();

    // Check if file format is not supported or size exceeds 5MB
    if (
      !isFileSupported(fileType, supportedTypes) ||
      file.size > 5 * 1024 * 1024
    ) {
      return res.status(400).json({
        success: false,
        message:
          "File format not supported or file size exceeds the limit of 5MB",
      });
    }

    // File format and size are valid, proceed with upload
    const response = await uploadFileCloudinary(file, "codeHelp_fileUpload");

    console.log(response);

    // db entry save
    const fileData = await File.create({
      name,
      email,
      tags,
      videoUrl: response.secure_url,
    });

    res.json({
      success: true,
      videoUrl: response.secure_url,
      message: "Video uploaded successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// image size reducer uploader
exports.imageReducerUpload = async (req, res) => {
  try {
    // data fetch
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.imageFile;
    console.log(file);

    // validation
    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();

    // file format not supported
    if (!isFileSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "File format not supported",
      });
    }

    // file format supported
    const response = await uploadFileCloudinary(
      file,
      "codeHelp_fileUpload",
      90
    );

    console.log(response);

    // db entry save
    const fileData = await File.create({
      name,
      email,
      tags,
      imgUrl: response.secure_url,
    });

    res.json({
      success: true,
      imageUrl: response.secure_url,
      message: "Image uploaded successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
