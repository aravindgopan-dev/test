const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = 3000;

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "You are a great storyteller who loves to tell bed time stories to the children, so write a bed time story for small girl of age group 6-9 years, about Little Red Riding Hood which should be easy understandable, engaging and contains some sort of suspense and give output as a json object. The story should be split into 4 parts and structured as an array of strings. Along with the array of parts, another array containing the descriptons of illustrations to be drawn for each part should be included. The description should be detailed. If there is a character in the illustration, the scene should feature girls's face of around 6-9 years of age. The child's face should be prominently visible and engaged in an activity relevant to the story. The illustrations should be realistic. Each instruction for the illustration should contain accurate descripton of the characters in the scene. Consistency should be kept",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '{"title":"Little red riding hood", "story":["Once upon a time, in a small village nestled in the heart of a dense forest, lived a sweet little girl named Little Red Riding Hood. She earned her name from the red hooded cloak her dear grandmother had lovingly made for her. "Be careful, my dear," her mother warned. "Stay on the path and don\'t talk to strangers." Little Red promised to follow her mother\'s instructions and set off on her journey with a skip in her step.","As Little Red hummed a merry tune while walking along the path, a cunning wolf had been watching her from the shadows. "Good morning, Little Red Riding Hood," the wolf said, pretending to be friendly. "Where are you off to with such a lovely basket?" "I\'m going to visit my grandmother. She\'s not feeling well, and I\'m taking her some goodies to make her feel better," replied Little Red. The wolf, plotting to get the treats, suggested she pick some flowers from the meadow for her grandmother. Little Red agreed and wandered into the meadow, while the wolf ran ahead to her grandmother\'s cottage.","The wolf reached the grandmother\'s cottage, locked her in the closet, and disguised himself by putting on her nightcap and glasses. When Little Red arrived, she knocked on the door. "Grandma, it\'s me, Little Red Riding Hood. I\'ve brought you some treats." The wolf, in a disguised voice, replied, "Come in, my dear." As she entered, Little Red noticed something odd. "Grandma, what big eyes you have," she said. The wolf responded, "The better to see you with, my dear." She grew more suspicious, noticing the big ears and teeth.","Just as the wolf revealed himself and was about to pounce, a brave woodsman burst into the cottage. Hearing the commotion, he had come to rescue Little Red and her grandmother. With a mighty swing of his axe, the woodsman frightened the wolf away. Little Red and her grandmother were safe. From that day on, Little Red learned an important lesson about staying on the path and not talking to strangers. She thanked the woodsman for saving her and promised to be more careful in the future."],"illustrations":["A close-up of a brown-haired girl wearing a red cloak, standing in a shadowy forest. Her wide eyes show a worried expression as she grips the edge of her cloak. In the background, faintly visible among the trees, the silhouette of a lurking wolf blends into the darkness. The scene has contrasting light—warm light on her face, and deep shadows in the forest behind her.", "A sunny village scene with a 7-year-old girl with curly brown hair in a bright red cloak, holding a wicker basket filled with goodies. A 30-year-old woman with long wavy brown hair stands nearby, giving her a warm smile. The background features a quaint cottage with colorful flowers in the garden. ","A vibrant forest scene along a winding path with a 7-year-old girl with curly brown hair in her red cloak walking joyfully. A cunning 5-year-old male wolf with sleek gray fur and sharp yellow eyes lurks behind a tree, watching her. Tall, lush green trees surround the path. ","Outside a small cozy cottage, a 7-year-old girl with curly brown hair is knocking on the door, looking curious. Through the window, a 60-year-old woman with gray hair in a nightcap and glasses peeks out, appearing gentle and frail. The charming cottage has flower boxes under the windows. ","Inside a cottage, a brave 35-year-old man with short brown hair bursts through the door holding an axe, looking determined. A 7-year-old girl with curly brown hair stands near the bed, expressing fear and relief. A 5-year-old male wolf in a nightcap and glasses looks surprised, while a 60-year-old woman with gray hair emerges from a closet, looking frightened."], "coverIllustration": "A close-up of a young girl with brown hair, wearing a bright red hooded cloak, standing in the middle of a dark, enchanted forest. She has a worried expression on her face, her eyes wide with concern. The towering trees around her create an eerie, shadowy atmosphere. In the background, the faint silhouette of a large, menacing wolf is hidden among the trees, its eyes glowing faintly. The scene is lit by a soft, warm light on the girl, contrasting with the deep shadows of the forest. The overall mood is one of suspense and mystery"}',
        },
      ],
    },
  ],
});

const geminiMiddleware = async (req, res, next) => {
  const { prompt, age, moral, language, gender, pages } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  const response = await chatSession.sendMessage(
    `You are a great storyteller who loves to tell bed time stories to the children, so write a bed time story for small ${gender} of age group ${age} years, about ${prompt} which should be easy understandable, engaging. The story should conaint some sort of suspense and give output as a json object in the format. The title should be given in the json. The story should be split into ${Math.max(
      Math.min(pages, 10),
      4
    )} parts with each part being about 4 sentences long and the parts structured as an array of strings. Another array containing the descriptons of illustrations to be drawn for each part should be included.  The description should be detailed. If there is a character in the illustration, the scene should feature ${gender}'s face of around ${age} years of age. The child's face should be prominently visible and engaged in an activity relevant to the story. The illustrations should be realistic. Each instruction for the illustration should contain accurate descripton of the characters in the scene. Consistency should be kept. The illustration instructions are meant for a image generation ai model. Structure it appropriately. Also, the response should be similar to the response before. The age and gender of all the character should be mentioned in every illustration instruction in the illustrations array. Whenever a character is mentioned, their appearance including the hair color and skin tone should also be provided along with it in the illustration description. Assume that each illustration is made by different illustrators with no knowledge of the story or other illustrations. The scene should be explained in detail. The illustrator need not anything about the story itself. They only need the desciption of the scene. For example "a 15 year old boy with brown hair and light skin standing in a beautiful garden". This description of the character should be kept consistent throughout the illustrations. Each illustration should be described in a single sentence. Along with the story and page illustrations, another value 'coverIllustration' should be included which is a prompt to generate a cover image for the given story. Double check the json format and characters for preventing errors.`
  );

  console.log(response.response.candidates[0].content.parts[0].text);
  const story = response.response.candidates[0].content.parts[0].text;
  req.body.geminiResponse = JSON.parse(story);
  console.log(req.body.geminiResponse);
  next();
};

const refreshImageMiddleware = async (req, res, next) => {
  const { text } = req.body;
  const response = await chatSession.sendMessage(`Provide illustration `);
};

module.exports = geminiMiddleware;
