import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorModule } from 'src/authors/authors.module';
import { AuthorResolver } from 'src/authors/authors.resolver';
import { AuthorService } from 'src/authors/authors.service';
import { BookModule } from 'src/books/books.module';
import { BookResolver } from 'src/books/books.resolver';
import { BookService } from 'src/books/books.service';
import { Author } from 'src/entities/author.entity';
import { Book } from 'src/entities/book.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book, Author]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
      subscriptions: {
        'graphql-ws': true,
      },
    }),
  ],
  providers: [
    BookResolver,
    BookModule,
    AuthorResolver,
    AuthorModule,
    BookService,
    AuthorService,
  ],
})
export class GraphqlModule {}
