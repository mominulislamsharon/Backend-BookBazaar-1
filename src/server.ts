import mongoose from 'mongoose';
import app from './app';
import config from './config';

async function server() {
  try {
    // mongodb database connection uri
    await mongoose.connect(config.database_url as string);

    // server running on
    app.listen(config.port, () => {
      console.log(`Bookshop Running ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

server();
