'use strict';

const express = require(`express`);
const mongoose = require(`mongoose`);
const logger = require(`morgan`);
// const compression = require(`compression`);
const htmlRoutes = require(`./routes/html-routes`);
const apiRoutes = require(`./routes/api-routes`);

const PORT = process.env.PORT || 3000;

const app = express();

// app.use(compression());
app.use(logger(`dev`));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(`public`));

mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost/workout`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// html routes
htmlRoutes(app);
// api routes
apiRoutes(app);

app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
});