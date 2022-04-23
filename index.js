import http from "http";

const host = "127.0.0.1";
const port = 8000;

const server = http.createServer((req, res) => {
  switch (req.method) {
    case "GET":
      switch (req.url) {
        case "/hello":
          res.writeHead(200, { "Content-Type": "text/plain" });
          res.end("В чем разница между уткой?");
          break;
        case "/api/users":
          res.end(
            JSON.stringify([
              {
                id: 1,
                name: "John Doe",
                email: "",
              },
            ])
          );
          break;
        default:
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("Страница не найдена");
      }
      break;
    case "POST":
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Неси это кольцо в мордовию!");
      break;
    default:
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Неа");
  }
});

server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`);
});
