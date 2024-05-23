import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Author } from './author.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  authorId: number;

  @ManyToOne(() => Author, (author) => author.book)
  @JoinColumn({ name: 'authorId' })
  author: Author;
}
