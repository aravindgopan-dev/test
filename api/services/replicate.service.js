const Replicate = require("replicate");

const cloudinaryUpload = require("./cloudinary.service");

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const mergeParts = (parts) => parts.map((str, i) => `Part 1: str\n`);

async function generateImagesMiddleware(req, res, next) {
  console.log("works");
  const {
    geminiResponse: { story: parts, illustrations, coverIllustration },
    prompt,
    age,
    gender,
  } = req.body;
  let allImages = [];

  const getPromptOut = async (prompt) => {
    const output = await replicate.run(
      "bytedance/sdxl-lightning-4step:5f24084160c9089501c1b3545d9be3c27883ae2239b6f412990e82d4a6210f8f",
      {
        input: {
          prompt,
          negative_prompt:
            "lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry",
          number_of_images: 1,
        },
      }
    );
    return output;
  };
  for (let i = 0; i < parts.length; i++) {
    // Run the Replicate API with the current prompt
    const output = await getPromptOut(
      `Create a high-quality image somehow looks like an illustration of the the scene, "${illustrations[i]}" like an animation going on. If there is a person in the scene, the person should only a single ${gender}'s of around ${age} years of age. The child's face should be prominently visible and engaged in an activity relevant to the story. The illustration should have a cartoony art style.`
    );
    console.log(output);
    // The scene should feature only a single ${gender}'s face of around ${age} years of age. The child's face should be prominently visible and engaged in an activity relevant to the story.
    // Assuming output is an array of URLs, concatenate the URLs with " **** "
    // Create a high-quality image somehow looks like a screenshot from the story ${parts[i]} like an animation going on. If there is a person in the scene, the person should only a single ${gender}'s of around ${age} years of age. The child's face should be prominently visible and engaged in an activity relevant to the story.
    if (output[0]) {
      allImages.push(output[0]);
    }
  }
  const coverImage = (await getPromptOut(coverIllustration))[0];
  console.log(coverImage, "woksss");
  // Remove the last " **** " from the end of allImages
  req.body.coverImage = await cloudinaryUpload(coverImage);
  req.body.images = await Promise.all(
    allImages.map((url) => cloudinaryUpload(url))
  );

  next();
}

module.exports = generateImagesMiddleware;
