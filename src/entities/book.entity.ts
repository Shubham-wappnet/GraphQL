import { JoinColumn, ManyToOne } from 'typeorm';
import { Author } from './author.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Book {
  @Field(() => ID)
  id: number;

  @Field()
  title: string;

  @Field()
  authorId: number;

  @ManyToOne(() => Author, (author) => author.book)
  @JoinColumn({ name: 'authorId' })
  author: Author;
}
