const express = require("express");
const cors = require("cors");




const { v4 } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {

    return response.status(200).json(repositories);

});
app.get("/repositories/:id", (request,response) => {
  const { id } = request.params
  
  const index = repositories.findIndex( repositorie => repositorie.id === id)
  console.log(index);
  if(index == -1) {
    return response.status(400).json({"Message": "Repositorie not found"})
  }
  return response.status(200).json(repositories[index]);

})


app.post("/repositories", (request, response) => {
    const { title, url, techs} = request.body
    let likes = 0;
    const id = v4();

    let repositorie = {
    id,
    title,
    url,
    techs,
    likes
    }
    repositories.push(repositorie);
    return response.status(200).json(repositorie);

      
});

app.put("/repositories/:id", (request, response) => {
    const { id } = request.params;
    const findIndex = repositories.findIndex( repositorie => repositorie.id === id)
    if(findIndex == -1) {
      return response.status(400).json({"message": "Repositorie not found"})
    }
    const { title, url, techs} = request.body;

    repositories[findIndex].title = title;
    repositories[findIndex].url = url;
    repositories[findIndex].techs = techs;

    response.status(200).json(repositories[findIndex]);

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const findIndex = repositories.findIndex( repositorie => repositorie.id === id)

  if(findIndex == -1 ) {
    return response.status(400).json({"Message": "Repositorie not found"})
  }
  let deletedRepositorie = repositories.splice(findIndex, 1)

  return response.status(204);


  
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const findIndex = repositories.findIndex( repositorie => repositorie.id === id)

  if(findIndex == -1 ) {
    return response.status(400).json("Repositorie does not exist")
  }
  repositories[findIndex].likes ++;

  return response.status(200).json({"likes": repositories[findIndex].likes});

});

module.exports = app;
