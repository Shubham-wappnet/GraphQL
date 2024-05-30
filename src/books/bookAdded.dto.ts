import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class BookAdded {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field(() => Int)
  authorId: number;
}
