import { Module } from '@nestjs/common';
import { BookService } from './books.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from 'src/entities/book.entity';
import { AuthorModule } from 'src/authors/authors.module';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  providers: [BookService, AuthorModule],
})
export class BookModule {}
