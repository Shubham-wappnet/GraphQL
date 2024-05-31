import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class createBookArgs {
  @Field(() => String)
  title: string;

  @Field(() => Int)
  authorId: number;
}
