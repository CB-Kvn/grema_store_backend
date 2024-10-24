import { PrismaClient } from '@prisma/client';
import logger from '../../../src/utils/logger/logger';
import { v4 as uuidv4 } from 'uuid';


export class MantColorService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async getAllColors(status: string): Promise<any> {
    try {

      let colors
      if (status === "all") {
        colors = await this.prisma.mantColor.findMany();
      } else {
        colors = await this.prisma.mantColor.findMany({
          where: {
            status: status
          }
        });
      }

      logger.debug({ message: 'Successfully retrieved all colors', data: colors });
      return { message: 'Successfully retrieved all colors', data: colors };
    } catch (error: any) {
      logger.error(`Error fetching colors: ${error.message}`);
      throw new Error('Error fetching colors');
    }
  }

  public async getColorById(id: string): Promise<any> {
    try {
      const color = await this.prisma.mantColor.findUnique({ where: { id } });
      if (!color) {
        throw new Error('Color not found');
      }
      logger.debug({ message: 'Successfully retrieved color', data: color });
      return { message: 'Successfully retrieved color', data: color };
    } catch (error: any) {
      logger.error(`Error fetching color by ID: ${error.message}`);
      throw new Error('Error fetching color');
    }
  }

  public async createColor(data: any): Promise<any> {
    try {

      const newColor = await this.prisma.mantColor.create({
        data: {
          id: uuidv4(),
          hexaCode: data.data.mantenaince.hex,
          name: data.data.mantenaince.name,
          status: data.data.mantenaince.status

        }
      });
      logger.debug({ message: 'Successfully created new color', data: newColor });
      return { message: 'Successfully created new color', data: newColor };
    } catch (error: any) {
      logger.error(`Error creating color: ${error.message}`);
      throw new Error('Error creating color');
    }
  }

  public async updateColor(id: string, data: any): Promise<any> {
    try {
      const updatedColor = await this.prisma.mantColor.update({
        where: { id },
        data,
      });
      logger.debug({ message: 'Successfully updated color', data: updatedColor });
      return { message: 'Successfully updated color', data: updatedColor };
    } catch (error: any) {
      logger.error(`Error updating color: ${error.message}`);
      throw new Error('Error updating color');
    }
  }

  public async deleteColor(id: string): Promise<any> {
    try {
      await this.prisma.mantColor.delete({ where: { id } });
      logger.debug({ message: 'Successfully deleted color', id });
      return { message: 'Successfully deleted color' };
    } catch (error: any) {
      logger.error(`Error deleting color: ${error.message}`);
      throw new Error('Error deleting color');
    }
  }
}

export class MantMaterialService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async getAllMaterials(status: string): Promise<any> {
    try {

      let materials
      if (status === "all") {
        materials = await this.prisma.mantMaterial.findMany();
      } else {
        materials = await this.prisma.mantMaterial.findMany({
          where: {
            status: status
          }
        });
      }
      logger.debug({ message: 'Successfully retrieved all materials', data: materials });
      return { message: 'Successfully retrieved all materials', data: materials };
    } catch (error: any) {
      logger.error(`Error fetching materials: ${error.message}`);
      throw new Error('Error fetching materials');
    }
  }

  public async getMaterialById(id: string): Promise<any> {
    try {
      const material = await this.prisma.mantMaterial.findUnique({ where: { id } });
      if (!material) {
        throw new Error('Material not found');
      }
      logger.debug({ message: 'Successfully retrieved material', data: material });
      return { message: 'Successfully retrieved material', data: material };
    } catch (error: any) {
      logger.error(`Error fetching material by ID: ${error.message}`);
      throw new Error('Error fetching material');
    }
  }

  public async createMaterial(data: any): Promise<any> {
    try {
      const newMaterial = await this.prisma.mantMaterial.create({
        data: {
          id: uuidv4(),
          name: data.data.mantenaince.name,
          status: data.data.mantenaince.status

        }
      });
      logger.debug({ message: 'Successfully created new material', data: newMaterial });
      return { message: 'Successfully created new material', data: newMaterial };
    } catch (error: any) {
      logger.error(`Error creating material: ${error.message}`);
      throw new Error('Error creating material');
    }
  }

  public async updateMaterial(id: string, data: any): Promise<any> {
    try {
      const updatedMaterial = await this.prisma.mantMaterial.update({
        where: { id },
        data,
      });
      logger.debug({ message: 'Successfully updated material', data: updatedMaterial });
      return { message: 'Successfully updated material', data: updatedMaterial };
    } catch (error: any) {
      logger.error(`Error updating material: ${error.message}`);
      throw new Error('Error updating material');
    }
  }

  public async deleteMaterial(id: string): Promise<any> {
    try {
      await this.prisma.mantMaterial.delete({ where: { id } });
      logger.debug({ message: 'Successfully deleted material', id });
      return { message: 'Successfully deleted material' };
    } catch (error: any) {
      logger.error(`Error deleting material: ${error.message}`);
      throw new Error('Error deleting material');
    }
  }
}


export class MantSizeService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async getAllSizes(status: string): Promise<any> {
    try {

      let sizes
      if (status === "all") {
        sizes = await this.prisma.mantSize.findMany();
      } else {
        sizes = await this.prisma.mantSize.findMany({
          where: {
            status: status
          }
        });
      }
      logger.debug({ message: 'Successfully retrieved all sizes', data: sizes });
      return { message: 'Successfully retrieved all sizes', data: sizes };
    } catch (error: any) {
      logger.error(`Error fetching sizes: ${error.message}`);
      throw new Error('Error fetching sizes');
    }
  }

  public async getSizeById(id: string): Promise<any> {
    try {
      const size = await this.prisma.mantSize.findUnique({ where: { id } });
      if (!size) {
        throw new Error('Size not found');
      }
      logger.debug({ message: 'Successfully retrieved size', data: size });
      return { message: 'Successfully retrieved size', data: size };
    } catch (error: any) {
      logger.error(`Error fetching size by ID: ${error.message}`);
      throw new Error('Error fetching size');
    }
  }

  public async createSize(data: any): Promise<any> {
    try {
      const newSize = await this.prisma.mantSize.create({
        data: {
          id: uuidv4(),
          name: data.data.mantenaince.name,
          status: data.data.mantenaince.status

        }
      });
      logger.debug({ message: 'Successfully created new size', data: newSize });
      return { message: 'Successfully created new size', data: newSize };
    } catch (error: any) {
      logger.error(`Error creating size: ${error.message}`);
      throw new Error('Error creating size');
    }
  }

  public async updateSize(id: string, data: any): Promise<any> {
    try {
      const updatedSize = await this.prisma.mantSize.update({
        where: { id },
        data,
      });
      logger.debug({ message: 'Successfully updated size', data: updatedSize });
      return { message: 'Successfully updated size', data: updatedSize };
    } catch (error: any) {
      logger.error(`Error updating size: ${error.message}`);
      throw new Error('Error updating size');
    }
  }

  public async deleteSize(id: string): Promise<any> {
    try {
      await this.prisma.mantSize.delete({ where: { id } });
      logger.debug({ message: 'Successfully deleted size', id });
      return { message: 'Successfully deleted size' };
    } catch (error: any) {
      logger.error(`Error deleting size: ${error.message}`);
      throw new Error('Error deleting size');
    }
  }
}

export class MantShapeService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async getAllShapes(status: string): Promise<any> {
    try {

      let shapes
      if (status === "all") {
        shapes = await this.prisma.mantShape.findMany();
      } else {
        shapes = await this.prisma.mantShape.findMany({
          where: {
            status: status
          }
        });
      }
      logger.debug({ message: 'Successfully retrieved all shapes', data: shapes });
      return { message: 'Successfully retrieved all shapes', data: shapes };
    } catch (error: any) {
      logger.error(`Error fetching shapes: ${error.message}`);
      throw new Error('Error fetching shapes');
    }
  }

  public async getShapeById(id: string): Promise<any> {
    try {
      const shape = await this.prisma.mantShape.findUnique({ where: { id } });
      if (!shape) {
        throw new Error('Shape not found');
      }
      logger.debug({ message: 'Successfully retrieved shape', data: shape });
      return { message: 'Successfully retrieved shape', data: shape };
    } catch (error: any) {
      logger.error(`Error fetching shape by ID: ${error.message}`);
      throw new Error('Error fetching shape');
    }
  }

  public async createShape(data: any): Promise<any> {
    try {
      const newShape = await this.prisma.mantShape.create({
        data: {
          id: uuidv4(),
          name: data.data.mantenaince.name,
          status: data.data.mantenaince.status

        }
      });
      logger.debug({ message: 'Successfully created new shape', data: newShape });
      return { message: 'Successfully created new shape', data: newShape };
    } catch (error: any) {
      logger.error(`Error creating shape: ${error.message}`);
      throw new Error('Error creating shape');
    }
  }

  public async updateShape(id: string, data: any): Promise<any> {
    try {
      const updatedShape = await this.prisma.mantShape.update({
        where: { id },
        data,
      });
      logger.debug({ message: 'Successfully updated shape', data: updatedShape });
      return { message: 'Successfully updated shape', data: updatedShape };
    } catch (error: any) {
      logger.error(`Error updating shape: ${error.message}`);
      throw new Error('Error updating shape');
    }
  }

  public async deleteShape(id: string): Promise<any> {
    try {
      await this.prisma.mantShape.delete({ where: { id } });
      logger.debug({ message: 'Successfully deleted shape', id });
      return { message: 'Successfully deleted shape' };
    } catch (error: any) {
      logger.error(`Error deleting shape: ${error.message}`);
      throw new Error('Error deleting shape');
    }
  }
}

export class MantCategoryService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async getAllCategory(status: string): Promise<any> {
    try {

      let shapes
      if (status === "all") {
        shapes = await this.prisma.category.findMany();
      } else {
        shapes = await this.prisma.category.findMany({
          where: {
            status: status
          }
        });
      }
      logger.debug({ message: 'Successfully retrieved all shapes', data: shapes });
      return { message: 'Successfully retrieved all shapes', data: shapes };
    } catch (error: any) {
      logger.error(`Error fetching shapes: ${error.message}`);
      throw new Error('Error fetching shapes');
    }
  }

}


