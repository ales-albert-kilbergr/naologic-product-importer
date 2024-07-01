import { Global, Logger, Module, Optional } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: MongoMemoryServer,
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const mongoUri = config.get('mongo.uri');
        const logger = new Logger('MONGMongooseInmemoryServerModule');
        // No Configuration for mongo found, app will run with an in-memory database
        // (Suitable for testing and development environments)
        if (!mongoUri) {
          logger.log('Starting in-memory database');
          return await MongoMemoryServer.create();
        }
        return null;
      },
    },
  ],
  exports: [MongoMemoryServer],
})
class MongooseInmemoryServerModule {
  constructor(
    @Optional()
    private memoryServer: MongoMemoryServer | null
  ) {}

  public async onApplicationShutdown(): Promise<void> {
    if (this.memoryServer) {
      await this.memoryServer.stop();
    }
  }
}

export const MONGO_IMPORT = MongooseModule.forRootAsync({
  imports: [ConfigModule, MongooseInmemoryServerModule],
  inject: [ConfigService, MongoMemoryServer],
  useFactory: async (
    config: ConfigService,
    memoryServer: MongoMemoryServer | null
  ) => {
    const logger = new Logger('MONGO_IMPORT');
    let mongoUri: string;

    if (memoryServer) {
      mongoUri = memoryServer.getUri();
      logger.log(`Running with in-memory database: ${mongoUri}`);
    } else {
      mongoUri = config.get('mongo.uri');
      const mongoPassword = config.get('mongo.password');
      const mongoUsername = config.get('mongo.username');
      mongoUri = `mongodb://${mongoUsername}:${mongoPassword}@${mongoUri}`;
      logger.log('Running with real database');
    }

    return { uri: mongoUri };
  },
});
