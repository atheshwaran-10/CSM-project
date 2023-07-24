import { translate } from '@vitalets/google-translate-api';
import express from 'express';
import bodyParser from 'body-parser';
import  {HttpProxyAgent} from 'http-proxy-agent';


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const proxy = 'http://103.152.112.234';
const agent = new HttpProxyAgent(proxy);



app.post("/", async (req, res) => {
  const { text } = req.body;
  try {
    const translated = await translate(text, {
      to: 'en',
      fetchOptions: {agent},
    });
    res.send(translated.text);
  } 
  catch (err) {
    console.error("Translation error:", err);
    res.status(500).send("Error while translating text.");
  }
});



const port = 3000;
app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
