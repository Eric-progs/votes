const app = require("./utils/config");

const voteRoute = require("./routes/votings");

app.use("/api", voteRoute);

app.listen(3000, () => console.log("Server is running..."));
