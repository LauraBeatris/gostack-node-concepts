"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var uuidv4_1 = require("uuidv4");
var app = express_1.default();
app.use(express_1.default.json());
app.use(cors_1.default());
var repositories = [];
app.get("/repositories", function (_, response) {
    return response.json(repositories);
});
app.post("/repositories", function (request, response) {
    var _a = request.body, url = _a.url, title = _a.title, techs = _a.techs;
    var repository = {
        id: uuidv4_1.uuid(),
        url: url,
        title: title,
        techs: techs,
        likes: 0
    };
    repositories.push(repository);
    return response.json(repository);
});
app.put("/repositories/:id", function (request, response) {
    var _a = request.body, url = _a.url, title = _a.title, techs = _a.techs;
    var id = request.params.id;
    if (!uuidv4_1.isUuid(id))
        return response.status(400).json({ error: "Invalid repository id" });
    var repositoryIndex = repositories.findIndex(function (repository) { return repository.id === id; });
    var repositoryFound = repositories.find(function (repository) { return repository.id === id; });
    if (repositoryIndex < 0)
        return response.status(404).json({ error: "Repository not found" });
    if (repositoryFound) {
        var repository = __assign(__assign({}, repositoryFound), { url: url,
            title: title,
            techs: techs });
        repositories.splice(repositoryIndex, 1);
        repositories.splice(repositoryIndex, 0, repository);
        return response.json(repository);
    }
});
app.delete("/repositories/:id", function (request, response) {
    var id = request.params.id;
    if (!uuidv4_1.isUuid(id))
        return response.status(400).json({ error: "Invalid repository id" });
    var repositoryIndex = repositories.findIndex(function (r) { return r.id === id; });
    if (repositoryIndex < 0)
        return response.status(404).json({ error: "Repository not found" });
    repositories.splice(repositoryIndex, 1);
    return response.status(204).send();
});
app.post("/repositories/:id/like", function (request, response) {
    var id = request.params.id;
    if (!uuidv4_1.isUuid(id))
        return response.status(400).json({ error: "Invalid repository id" });
    var repositoryIndex = repositories.findIndex(function (repository) { return repository.id === id; });
    var repositoryFound = repositories.find(function (repository) { return repository.id === id; });
    if (repositoryIndex < 0)
        return response.status(404).json({ error: "Repository not found" });
    if (repositoryFound) {
        var likes = repositoryFound.likes;
        var repository = __assign(__assign({}, repositoryFound), { likes: likes + 1 });
        repositories.splice(repositoryIndex, 1);
        repositories.splice(repositoryIndex, 0, repository);
        return response.json(repository);
    }
});
exports.default = app;
