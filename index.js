const fs = require("fs");
const superagent = require("superagent");
const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject(err);
      resolve("Successfully Wrote");
    });
  });
};

const getDogPic = async() => {
  try{
  const data = await readFilePro(`${__dirname}/dog.txt`);
  console.log(`Breed: ${data}`);

  const res = await superagent
  .get(`https://dog.ceo/api/breed/${data}/images/random`);
  console.log(res.body.message);

  await writeFilePro('dog-img.txt', res.body.message);
  console.log('Random Dog Image Saved');
  } catch (err){
    console.log(err);
  }
};

getDogPic();

/*
readFilePro(`${__dirname}/dog.txt`)
.then(data => {
  console.log(`Breed: ${data}`);
  return superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .then((res) => {
      console.log(res.body.message);

      return writeFilePro('dog-text.txt', res.body.message);
       })
       .then(()=> {
        console.log("Random Dog Image Save To File!");
       })
    })
    .catch((err) => {
      console.log(err.message);
    });
*/