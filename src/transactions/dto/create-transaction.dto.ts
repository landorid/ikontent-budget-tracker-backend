import { Type } from 'class-transformer';
import { IsNotEmpty, IsInt, IsEnum, IsNumberString } from 'class-validator';
import { TransactionType } from '../transaction-type.enum';

export class CreateTransactionDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  amount: number;

  @IsEnum(TransactionType)
  type: TransactionType;
}
