import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
  ) {}
  async getAll(): Promise<Book[]> {
    return await this.bookRepository.find();
  }
  async getOne(id: number): Promise<Book> {
    return await this.bookRepository.findOne({ where: { id: id } });
  }
  async findBookByAuthor(id: number): Promise<Book[]> {
    const authorBooks = await this.bookRepository.find({
      where: { authorId: id },
    });
    return authorBooks;
  }
  async create(title: string, authorId: number): Promise<Book> {
    const book = new Book();
    book.title = title;
    book.authorId = authorId;
    await this.bookRepository.save(book);
    return book;
  }
  async remove(id: number): Promise<boolean> {
    const result = await this.bookRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    return true;
  }
}
