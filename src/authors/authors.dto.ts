import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BookDTO } from 'src/books/books.dto';

@ObjectType()
export class AuthorDTO {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  name: string;

  @Field(() => [BookDTO], { nullable: true })
  book: BookDTO[];
}
