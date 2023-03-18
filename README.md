# aiassistsummarizer

## What is this?

I wanted to see how hard it is to create a basic chrome extension where ChatGPT writes a majority of the codebase. 

The chrome extension simply allows one to select over an area of text in a webpage and shows the user a summary of the selected text. The summary is generated 
by OpenAI's [completions API](https://platform.openai.com/docs/guides/completion/introduction) 

I started with the prompt :

```
Write a chrome extenstion that uses the openai API to generate summaries of highlighted text on a page when the user hovers over a selected area of text
```


See here for the full conversation. 


# Components 
## Backend 
- The folder aiassistantbackend contains the backend server logic that the chrome extensions will call. It is a simple endpoint that makes a 
call to the OpenAI completions endpoint to retrieve a summary of text

## Frontend 
- The folder aiassittext contains the logic for the chrome extention. The extension requires permission to read contents of tabs. When the user highlights text it makes a call to the backend 
to retrieve a summary. 



## How to run it 

## Prerequistes
 - Basic knowledge of what browser extensions are
 - Basic Knowledge of NodeJS 
 - Install Node 
 - [Sign up with OpenAI and get an API key](https://openai.com/blog/openai-api)

1. Clone this repo 
2. cd into the aiassistantbackend and create a .env file . Set a value of OPENAI_API_KEY with the value of your openAI api key 
3. Run ```npm install; && node server.js```. Your backend should be running at http://localhost:4000
4. Install the extension by going to chrome://extensions/ in Chrome. Click the "Load Unpacked" option at top left and choose the aiassisttext folder in this repo. 
5. You should now have the extension installed. By default it will try to access the backend at http://localhost:4000. 

## How to use it 

Once installed click the extension and highlight a piece of text on a webpage. A summary of the text should show. 


 

