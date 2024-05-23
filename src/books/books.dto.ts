import { Field, ObjectType } from '@nestjs/graphql';
import { AuthorDTO } from 'src/authors/authors.dto';

@ObjectType()
export class BookDTO {
  @Field()
  id: number;

  @Field()
  title: string;

  @Field()
  authorId: number;

  @Field(() => AuthorDTO, { nullable: true })
  author?: AuthorDTO;
}
