import { Field, Int, ObjectType } from '@nestjs/graphql';
import { AuthorDTO } from 'src/authors/authors.dto';

@ObjectType()
export class BookDTO {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field(() => Int)
  authorId: number;

  @Field(() => AuthorDTO, { nullable: true })
  author?: AuthorDTO;
}
