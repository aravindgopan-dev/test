const { google } = require("googleapis");
const Story = require("../models/Story");
const Page = require("../models/Page");

const {
  BadRequestError,
  UnauthenticatedError,
  CustomApiError,
} = require("../errors/index");

const getAllStories = async (req, res) => {
  try {
    const stories = await Story.find().sort({ createdAt: -1 });
    res.send(stories);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error fetching stories" });
  }
};

const createStory = async (req, res) => {
  const { body } = req;
  if (!body.geminiResponse || !body.geminiResponse.story || !body.images) {
    throw new BadRequestError("Missing required fields in request body");
  }
  const { story: parts, title } = body.geminiResponse;
  /*console.log(body.geminiResponse);
  console.log(parts, title, body.images);
  if (!title || !parts || !body.images) {
    throw new BadRequestError("Title, story parts, and images are required");
  }*/
  const story = new Story({
    title,
    coverUrl: body.coverImage,
  });
  console.log(body.images);
  const pages = parts.map((part, i) => {
    return { caption: part, imgUrl: body.images[i], pno: i + 1 };
  });
  try {
    const savedStory = await story.save();

    // Create pages for the story
    const pagesToCreate = pages.map((pageData) => {
      return Page.create({
        story: savedStory._id,
        caption: pageData.caption,
        imgUrl: pageData.imgUrl,
        pageNumber: pageData.pno,
      });
    });
    await Promise.all(pagesToCreate);
    res.json({
      message: "Story created successfully",
      title,
      stodyId: savedStory._id,
    });
  } catch (err) {
    res.status(500).send({ message: "Error creating story" });
  }
};

const getStoryDetails = async (req, res) => {
  const { storyId } = req.params;
  try {
    const story = await Story.findById(storyId);
    console.log(story)
    if (!story) {
      throw new BadRequestError("No story found");
    }
    console.log("works", story);
    res.json(story);
  } catch (err) {
    res.status(500).send({ message: "Error fetching story details" });
  }
};

const getPagesOfStory = async (req, res) => {
  const { params } = req;
  if (!params.storyId) {
    throw new BadRequestError("Story ID is required");
  }
  try {
    const story = await Story.findById(params.storyId);
    if (!story) {
      throw new BadRequestError("Story not found");
    }
    const pages = await Page.find({ story: params.storyId }).sort("pageNumber");
    if (!pages) {
      throw new BadRequestError("No pages found for the story");
    }
    res.send(pages);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error fetching pages" });
  }
};

const deleteStory = async (req, res) => {
  const { params } = req;
  if (!params.storyId) {
    throw new BadRequestError("Story ID is required");
  }
  try {
    const story = await Story.findOneAndDelete({ _id: params.storyId });
    if (!story) {
      throw new BadRequestError("Story not found");
    } else {
      // Delete associated pages
      const pages = await Page.find({ story: params.storyId });
      if (!pages) {
        throw new BadRequestError("No pages found for the story");
      }
      await Page.deleteMany({ story: params.storyId });
      res.json({ message: "Story deleted successfully" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error deleting story" });
  }
};

module.exports = {
  getAllStories,
  createStory,
  getPagesOfStory,
  deleteStory,
  getStoryDetails,
};
