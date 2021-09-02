import app from './app';

const port = 5000;
app.listen(port, () => {
  console.info(`Server is starting on port : ${port}`);
});
