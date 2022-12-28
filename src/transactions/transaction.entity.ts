import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TransactionType } from './transaction-type.enum';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  amount: number;

  @Column()
  type: TransactionType;
}
