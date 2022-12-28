import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TransactionType } from '../transaction-type.enum';

export class GetTransactionsFilterDto {
  @IsOptional()
  @IsEnum(TransactionType)
  type?: TransactionType;

  @IsOptional()
  @IsString()
  search?: string;
}
