import express from "express";
import cors from "cors";
import { uuid, isUuid } from "uuidv4";

import Repository from "./interfaces/Repository";

const app = express();

app.use(express.json());
app.use(cors());

const repositories: Array<Repository> = [];

app.get("/repositories", (_, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { url, title, techs } = request.body;

  const repository: Repository = {
    id: uuid(),
    url,
    title,
    techs,
    likes: 0
  };

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { url, title, techs } = request.body;
  const id: string = request.params.id;

  if (!isUuid(id)) return response.status(400).json({ error: "Invalid repository id" });

  let repositoryIndex: number = repositories.findIndex((repository: Repository) => repository.id === id);
  let repositoryFound = repositories.find((repository: Repository) => repository.id === id);

  if (repositoryIndex < 0) return response.status(404).json({ error: "Repository not found" });

  if (repositoryFound) {
    const repository: Repository = {
        ...repositoryFound,
        url,
        title,
        techs
      };

      repositories.splice(repositoryIndex, 1);
      repositories.splice(repositoryIndex, 0, repository);

    return response.json(repository);
  }
});

app.delete("/repositories/:id", (request, response) => {
  const id: string = request.params.id;

  if (!isUuid(id)) return response.status(400).json({ error: "Invalid repository id" });
  const repositoryIndex = repositories.findIndex((r: Repository) => r.id === id);

  if (repositoryIndex < 0) return response.status(404).json({ error: "Repository not found" });

  repositories.splice(repositoryIndex, 1);
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
    const id: string = request.params.id;
    if (!isUuid(id)) return response.status(400).json({ error: "Invalid repository id" });

    let repositoryIndex: number = repositories.findIndex(repository => repository.id === id);
    let repositoryFound = repositories.find(repository => repository.id === id);
    if (repositoryIndex < 0) return response.status(404).json({ error: "Repository not found" });

    if (repositoryFound) {
        const likes = repositoryFound.likes;
        const repository = {
            ...repositoryFound,
            likes: likes + 1
        }

        repositories.splice(repositoryIndex, 1);
        repositories.splice(repositoryIndex, 0, repository);

        return response.json(repository);
    }
});

export default app
