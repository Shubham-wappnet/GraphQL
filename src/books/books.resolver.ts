import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  Subscription,
} from '@nestjs/graphql';
import { BookService } from './books.service';
import { BookDTO } from './books.dto';
import { AuthorService } from 'src/authors/authors.service';
import { AuthorDTO } from 'src/authors/authors.dto';
import { Book } from 'src/entities/book.entity';
import { Author } from 'src/entities/author.entity';
import { createBookArgs } from './create-book.args';
import { PubSub } from 'graphql-subscriptions';
import { BookAdded } from './bookAdded.dto';

const pubSub = new PubSub();
@Resolver(() => BookDTO)
export class BookResolver {
  constructor(
    private readonly bookService: BookService,
    private readonly authorService: AuthorService,
  ) {}

  @Query(() => [BookDTO])
  async getBooks(): Promise<Book[]> {
    return await this.bookService.findAll();
  }
  // @Query(() => [BookDTO])
  // book(): BookDTO[] {
  //   return [
  //     {
  //       id: 1,
  //       title: 'Sample Book',
  //       authorId: 1,
  //       author: {
  //         id: 1,
  //         name: 'Author Name',
  //       },
  //     },
  //   ];
  // }

  @Query(() => BookDTO)
  async getBooksByid(@Args('id') id: number): Promise<Book> {
    const book = await this.bookService.findOne(id);
    return book;
  }

  @Mutation(() => BookDTO)
  async createBook(@Args() args: createBookArgs): Promise<Book> {
    const { title, authorId } = args;
    const book = await this.bookService.create(title, authorId);
    pubSub.publish('bookAdded', { bookAdded: book });
    return book;
  }

  @Mutation(() => Boolean)
  async deleteBook(@Args('id') id: number): Promise<boolean> {
    return await this.bookService.remove(id);
  }

  @ResolveField('author', () => AuthorDTO)
  async getAuthor(@Parent() book: BookDTO): Promise<Author> {
    const authorId = book.authorId;
    return this.authorService.findOne(authorId);
  }

  @Subscription(() => BookAdded, {
    name: 'bookAdded',
    resolve: (bk) => bk.bookAdded,
  })
  bookAdded() {
    return pubSub.asyncIterator('bookAdded');
  }
}
