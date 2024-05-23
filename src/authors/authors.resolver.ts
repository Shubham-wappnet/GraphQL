import { Resolver, Query, ResolveField, Parent, Args } from '@nestjs/graphql';
import { AuthorService } from './authors.service';
import { AuthorDTO } from './authors.dto';
import { BookService } from 'src/books/books.service';
import { Author } from 'src/entities/author.entity';
import { Book } from 'src/entities/book.entity';

@Resolver(() => AuthorDTO)
export class AuthorResolver {
  constructor(
    private readonly authorService: AuthorService,
    private readonly bookService: BookService,
  ) {}

  @Query(() => AuthorDTO, { name: 'author' })
  async getAuthor(@Args('id') id: number): Promise<AuthorDTO> {
    return await this.authorService.getOne(id);
  }

  @ResolveField('book', () => [Book])
  async getAuthorBooks(@Parent() author: Author): Promise<Book[]> {
    const { id } = author;
    return await this.bookService.findBookByAuthor(id);
  }
}
