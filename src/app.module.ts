import { Module } from '@nestjs/common';
import { ExpensesModule } from './expenses/expenses.module';

import { ConfigModule } from '@nestjs/config';
import { configValidationSchema } from './config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),
    ExpensesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
