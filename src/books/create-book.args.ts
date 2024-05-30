import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class createBookArgs {
  @Field()
  title: string;

  @Field(() => Int)
  authorId: number;
}
