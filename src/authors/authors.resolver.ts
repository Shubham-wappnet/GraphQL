import {
  Resolver,
  Query,
  ResolveField,
  Parent,
  Args,
  Mutation,
} from '@nestjs/graphql';
import { AuthorService } from './authors.service';
import { AuthorDTO } from './authors.dto';
import { BookService } from 'src/books/books.service';
import { Author } from 'src/entities/author.entity';
import { BookDTO } from 'src/books/books.dto';

@Resolver(() => AuthorDTO)
export class AuthorResolver {
  constructor(
    private readonly authorService: AuthorService,
    private readonly bookService: BookService,
  ) {}

  @Query(() => AuthorDTO)
  async getAuthors(): Promise<Author[]> {
    return await this.authorService.findAll();
  }

  @Mutation(() => AuthorDTO)
  async createAuthor(@Args('name') name: string): Promise<AuthorDTO> {
    return await this.authorService.create(name);
  }

  @Mutation(() => Boolean)
  async deleteAuthor(@Args('id') id: number): Promise<boolean> {
    return await this.authorService.remove(id);
  }

  @ResolveField('book', () => [BookDTO])
  async getAuthorBooks(@Parent() author: Author): Promise<BookDTO[]> {
    const { id } = author;
    return await this.bookService.findBookByAuthor(id);
  }
}
