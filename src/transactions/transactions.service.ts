import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { GetTransactionsFilterDto } from './dto/get-transactions-filter.dto';
import { Transaction } from './transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
  ) {}

  async createTransaction(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    const { name, amount, type } = createTransactionDto;

    const transaction = this.transactionsRepository.create({
      name,
      amount,
      type,
    });

    const result = await this.transactionsRepository.save(transaction);

    return result;
  }

  async getTransactionById(id: string): Promise<Transaction> {
    const result = await this.transactionsRepository.findOne({ where: { id } });

    if (!result) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }

    return result;
  }

  async deleteTransaction(id: string): Promise<void> {
    const result = await this.transactionsRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Transaction with ID ${id} not found!`);
    }
  }

  async getTransactions(
    filterDto: GetTransactionsFilterDto,
  ): Promise<Transaction[]> {
    const { type, search } = filterDto;
    const query = this.transactionsRepository.createQueryBuilder('transaction');

    if (type) {
      query.andWhere('transaction.type = :type', { type });
    }

    if (search) {
      query.andWhere('LOWER(transaction.name) LIKE LOWER(:search)', {
        search: `%${search}%`,
      });
    }

    try {
      const transactions = await query.getMany();

      return transactions;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
