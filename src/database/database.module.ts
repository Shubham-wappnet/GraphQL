import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from 'src/entities/book.entity';
import { Author } from 'src/entities/author.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Author])],
})
export class DatabaseModule {}
