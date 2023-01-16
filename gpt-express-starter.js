const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.get('your-route', async (req, res) => {
    
  let body = {
      model: "text-davinci-003",        
      prompt: "YOUR PROMPT HERE",
      temperature: 1,
      max_tokens: 2086,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
  };

  
  const response = await openai.createCompletion(body);
  const answer = response.data.choices[0].text;

  res.send({ answer });
});

// Listen for requests
app.listen(3000, function() {
	console.log('Server is listening on port 3000');
});




////