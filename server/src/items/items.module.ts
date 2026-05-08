import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import {
  CategoryDocument,
  CategoryDocumentSchema,
} from './schemas/category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CategoryDocument.name, schema: CategoryDocumentSchema },
    ]),
  ],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
