import { OneToMany } from 'typeorm';
import { Book } from './book.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Author {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @OneToMany(() => Book, (book) => book.author, { cascade: true })
  book: Book[];
}
