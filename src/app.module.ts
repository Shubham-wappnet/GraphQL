import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphqlModule } from './graphql/graphql.module';
import { DatabaseModule } from './database/database.module';
import { BookModule } from './books/books.module';
import { AuthorModule } from './authors/authors.module';
import ormconfig from './config/config';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    GraphqlModule,
    DatabaseModule,
    BookModule,
    AuthorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
