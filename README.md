
# TaleGen

TaleGen is a web application that helps generate bedtime stories for children. Users can input a brief description of the story, the age and gender of the child, the style of art for illustrations, and the moral of the story to create personalized stories.

## Target Audience

- Children

## Core Features

- Users can input a small description of a story and specify the number of pages to generate a unique bedtime story.
- Generated stories include text and illustrations, and can be exported as PDFs.
- All generated stories are saved for later viewing.
- User authentication is required for access.

## Technology Stack

- **Frontend:** React
- **Backend:** Node.js with Express
- **Database:** MongoDB
- **APIs Used:** 
  - Gemini API
  - Replicate API
  - Cloudinary for content storage
- **Payment Gateway:** Users can buy credits required for generating stories.

## Installation & Setup

1. Clone the repository from GitHub.
2. Install the required packages using npm:
   ```bash
   npm install
   ```

### Prerequisites

- Node.js
### API 
- CREATE STORY    POST -/api/v1/stories/
- ALL STORY       GET -/api/v1/stories/
- STORY PAGES     GET -/api/v1/:id/pages
- STORY DETAILS   GET -/api/v1/:id
- DELETE STORY    DEL -/api/v1/:id
- CREATE USER     POST-/api/v1/user/register
- LOGIN USER      POST-/api/v1/user/login
## Usage

1. Input a small description of the story you want to generate.
2. Specify the age and gender of the user.
3. Choose the style of art for illustrations and the moral of the story.
4. Generate the story, which will be presented with text and illustrations.
5. Optionally, export the generated story as a PDF.

## Deployment

- The web app is deployed online on Render.

## Contributing

- Contributions are not currently accepted.

## License

- No specific license information provided.
