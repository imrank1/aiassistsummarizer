const express = require('express');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');
const dotenv = require('dotenv');
const cors = require('cors'); // Add this line
dotenv.config();


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Add this line

app.post('/summarize', async (req, res) => {
  const text = req.body.text;

  try {


    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: text + `\n\nTl;dr`,
        temperature: 0.7,
        max_tokens: 60,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 1,
      });
    const result = await response.data;
    const summary = result.choices[0].text.trim();
    res.json({ summary: summary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate summary' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
