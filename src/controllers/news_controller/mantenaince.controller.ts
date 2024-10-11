import { Request, Response } from 'express';

import logger from '../../../src/utils/logger/logger';
import { MantColorService, MantMaterialService, MantShapeService, MantSizeService } from '../../../src/services/news_endpoint.ts/mantenainces.endpoint';


export class MantShapeController {
    private mantShapeService: MantShapeService;

    constructor(mantShapeService: MantShapeService) {
        this.mantShapeService = mantShapeService;
    }

    public async getAllShapes(req: Request, res: Response): Promise<void> {
        try {
            const status = req.query.status
            const shapes = await this.mantShapeService.getAllShapes(status!.toString());

            if (!shapes || shapes.length === 0) {
                res.status(404).json({ error: 'No shapes found' });
                return;
            }

            res.status(200).json(shapes);
        } catch (error: any) {
            logger.error(`Failed to retrieve shapes: ${error.message}`);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    public async getShapeById(req: Request, res: Response): Promise<void> {
        try {
            const shape = await this.mantShapeService.getShapeById(req.params.id);

            if (!shape) {
                res.status(404).json({ error: 'Shape not found' });
                return;
            }

            res.status(200).json(shape);
        } catch (error: any) {
            logger.error(`Failed to retrieve shape with ID ${req.params.id}: ${error.message}`);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    public async createShape(req: Request, res: Response): Promise<void> {
        try {
            const newShape = await this.mantShapeService.createShape(req.body);

            res.status(201).json(newShape);
        } catch (error: any) {
            logger.error(`Failed to create shape: ${error.message}`);
            res.status(400).json({ error: 'Invalid request data' });
        }
    }

    public async updateShape(req: Request, res: Response): Promise<void> {
        try {
            const updatedShape = await this.mantShapeService.updateShape(req.params.id, req.body);

            if (!updatedShape) {
                res.status(404).json({ error: 'Shape not found' });
                return;
            }

            res.status(200).json(updatedShape);
        } catch (error: any) {
            logger.error(`Failed to update shape with ID ${req.params.id}: ${error.message}`);
            res.status(400).json({ error: 'Invalid request data' });
        }
    }

    public async deleteShape(req: Request, res: Response): Promise<void> {
        try {
            const deletedShape = await this.mantShapeService.deleteShape(req.params.id);

            if (!deletedShape) {
                res.status(404).json({ error: 'Shape not found' });
                return;
            }

            res.status(204).send();
        } catch (error: any) {
            logger.error(`Failed to delete shape with ID ${req.params.id}: ${error.message}`);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export class MantSizeController {
    private mantSizeService: MantSizeService;

    constructor(mantSizeService: MantSizeService) {
        this.mantSizeService = mantSizeService;
    }

    public async getAllSizes(req: Request, res: Response): Promise<void> {
        try {
            const status = req.query.status
            const sizes = await this.mantSizeService.getAllSizes(status!.toString());

            if (!sizes || sizes.length === 0) {
                res.status(404).json({ error: 'No sizes found' });
                return;
            }

            res.status(200).json(sizes);
        } catch (error: any) {
            logger.error(`Failed to retrieve sizes: ${error.message}`);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    public async getSizeById(req: Request, res: Response): Promise<void> {
        try {
            const size = await this.mantSizeService.getSizeById(req.params.id);

            if (!size) {
                res.status(404).json({ error: 'Size not found' });
                return;
            }

            res.status(200).json(size);
        } catch (error: any) {
            logger.error(`Failed to retrieve size with ID ${req.params.id}: ${error.message}`);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    public async createSize(req: Request, res: Response): Promise<void> {
        try {
            const newSize = await this.mantSizeService.createSize(req.body);

            res.status(201).json(newSize);
        } catch (error: any) {
            logger.error(`Failed to create size: ${error.message}`);
            res.status(400).json({ error: 'Invalid request data' });
        }
    }

    public async updateSize(req: Request, res: Response): Promise<void> {
        try {
            const updatedSize = await this.mantSizeService.updateSize(req.params.id, req.body);

            if (!updatedSize) {
                res.status(404).json({ error: 'Size not found' });
                return;
            }

            res.status(200).json(updatedSize);
        } catch (error: any) {
            logger.error(`Failed to update size with ID ${req.params.id}: ${error.message}`);
            res.status(400).json({ error: 'Invalid request data' });
        }
    }

    public async deleteSize(req: Request, res: Response): Promise<void> {
        try {
            const deletedSize = await this.mantSizeService.deleteSize(req.params.id);

            if (!deletedSize) {
                res.status(404).json({ error: 'Size not found' });
                return;
            }

            res.status(204).send();
        } catch (error: any) {
            logger.error(`Failed to delete size with ID ${req.params.id}: ${error.message}`);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export class MantMaterialController {
    private mantMaterialService: MantMaterialService;

    constructor(mantMaterialService: MantMaterialService) {
        this.mantMaterialService = mantMaterialService;
    }

    public async getAllMaterials(req: Request, res: Response): Promise<void> {
        try {
            const status = req.query.status
            const materials = await this.mantMaterialService.getAllMaterials(status!.toString());

            if (!materials || materials.length === 0) {
                res.status(404).json({ error: 'No materials found' });
                return;
            }

            res.status(200).json(materials);
        } catch (error: any) {
            logger.error(`Failed to retrieve materials: ${error.message}`);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    public async getMaterialById(req: Request, res: Response): Promise<void> {
        try {
            const material = await this.mantMaterialService.getMaterialById(req.params.id);

            if (!material) {
                res.status(404).json({ error: 'Material not found' });
                return;
            }

            res.status(200).json(material);
        } catch (error: any) {
            logger.error(`Failed to retrieve material with ID ${req.params.id}: ${error.message}`);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    public async createMaterial(req: Request, res: Response): Promise<void> {
        try {
            const newMaterial = await this.mantMaterialService.createMaterial(req.body);

            res.status(201).json(newMaterial);
        } catch (error: any) {
            logger.error(`Failed to create material: ${error.message}`);
            res.status(400).json({ error: 'Invalid request data' });
        }
    }

    public async updateMaterial(req: Request, res: Response): Promise<void> {
        try {
            const updatedMaterial = await this.mantMaterialService.updateMaterial(req.params.id, req.body);

            if (!updatedMaterial) {
                res.status(404).json({ error: 'Material not found' });
                return;
            }

            res.status(200).json(updatedMaterial);
        } catch (error: any) {
            logger.error(`Failed to update material with ID ${req.params.id}: ${error.message}`);
            res.status(400).json({ error: 'Invalid request data' });
        }
    }

    public async deleteMaterial(req: Request, res: Response): Promise<void> {
        try {
            const deletedMaterial = await this.mantMaterialService.deleteMaterial(req.params.id);

            if (!deletedMaterial) {
                res.status(404).json({ error: 'Material not found' });
                return;
            }

            res.status(204).send();
        } catch (error: any) {
            logger.error(`Failed to delete material with ID ${req.params.id}: ${error.message}`);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export class MantColorController {
    private mantColorService: MantColorService;

    constructor(mantColorService: MantColorService) {
        this.mantColorService = mantColorService;
    }

    public async getAllColors(req: Request, res: Response): Promise<void> {
        try {
            const status = req.query.status
            const colors = await this.mantColorService.getAllColors(status!.toString());

            if (!colors || colors.length === 0) {
                res.status(404).json({ error: 'No colors found' });
                return;
            }

            res.status(200).json(colors);
        } catch (error: any) {
            logger.error(`Failed to retrieve colors: ${error.message}`);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    public async getColorById(req: Request, res: Response): Promise<void> {
        try {
            const color = await this.mantColorService.getColorById(req.params.id);

            if (!color) {
                res.status(404).json({ error: 'Color not found' });
                return;
            }

            res.status(200).json(color);
        } catch (error: any) {
            logger.error(`Failed to retrieve color with ID ${req.params.id}: ${error.message}`);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    public async createColor(req: Request, res: Response): Promise<void> {
        try {
            const newColor = await this.mantColorService.createColor(req.body);

            res.status(201).json(newColor);
        } catch (error: any) {
            logger.error(`Failed to create color: ${error.message}`);
            res.status(400).json({ error: 'Invalid request data' });
        }
    }

    public async updateColor(req: Request, res: Response): Promise<void> {
        try {
            const updatedColor = await this.mantColorService.updateColor(req.params.id, req.body);

            if (!updatedColor) {
                res.status(404).json({ error: 'Color not found' });
                return;
            }

            res.status(200).json(updatedColor);
        } catch (error: any) {
            logger.error(`Failed to update color with ID ${req.params.id}: ${error.message}`);
            res.status(400).json({ error: 'Invalid request data' });
        }
    }

    public async deleteColor(req: Request, res: Response): Promise<void> {
        try {
            const deletedColor = await this.mantColorService.deleteColor(req.params.id);

            if (!deletedColor) {
                res.status(404).json({ error: 'Color not found' });
                return;
            }

            res.status(204).send();
        } catch (error: any) {
            logger.error(`Failed to delete color with ID ${req.params.id}: ${error.message}`);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}
