const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json())
const port = 3000;

app.get("/",(req,res)=>{
  res.send("Please put (/readFile) in front of the above link [localhost:3000] in the browser. Note: For writeFile & updateFile we have to use Postman because these are POST & GET APIs" )
})

// here we have to GET/readFile
app.get('/readFile', async (req, res) => {
  try {
    
    const data = await fs.promises.readFile('file.txt', 'utf-8');
    res.json(data);
  } catch (error) {
    res.status(500).send({ message: 'Error reading file', error });
  }
});

// here we have to POST/writeFile
app.post('/writeFile', async (req, res) => {
  try {
    const data = req.body.data || '' ;
    console.log(data);
    await fs.promises.writeFile('file.txt', data, 'utf-8');
    res.send({ message: 'File successfully written' });
  } catch (error) {
    console.error(error.message)
    res.status(500).send({ message: 'Error writing file', error });
  }
});

// here we have to PUT/updateFile
app.put('/updateFile', async (req, res) => {
  try {
    
   
    const data = req.body.data || '';
    let resp= await fs.promises.appendFile('file.txt','\n'+ data + '\n', 'utf-8');
    res.send({ message: 'File successfully updated' });
  } catch (error) {
    res.status(500).send({ message: 'Error updating file', error });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});