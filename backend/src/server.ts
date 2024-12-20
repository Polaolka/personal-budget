import { LoggerService } from '@common/logger/logger.service';

export async function startServer(port: string, app) {
  const logger = new LoggerService();

  await app.listen(port, () => {
    logger.log('SERVER', `Current MODE = ${process.env.NODE_ENV}`);
    logger.log('SERVER', `Server started on port = ${port}`);
    logger.log(
      'SERVER',
      `Server available on address = ${process.env.API_URL}`,
    );
  });
}
