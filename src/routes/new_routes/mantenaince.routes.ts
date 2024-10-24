import express from 'express';
import { MantCategoryController, MantColorController, MantMaterialController, MantShapeController, MantSizeController } from '../../../src/controllers/news_controller/mantenaince.controller';
import { MantCategoryService, MantColorService, MantMaterialService, MantShapeService, MantSizeService } from '../../../src/services/news_endpoint.ts/mantenainces.endpoint';


export const router = express.Router();

const  mantColorService = new MantColorService();
const  mantMaterialService = new MantMaterialService();
const  mantSizeService = new MantSizeService();
const  mantShaperService = new MantShapeService();
const  mantCategoryService = new MantCategoryService();

const mantColorController = new MantColorController(mantColorService);
const mantMaterialController = new MantMaterialController(mantMaterialService);
const mantSizeController = new MantSizeController(mantSizeService);
const mantShapeController = new MantShapeController(mantShaperService);
const mantCategoryController = new MantCategoryController(mantCategoryService);

router.post("/color", (req, res) => mantColorController.createColor(req, res));
router.get("/color-all", (req, res) => mantColorController.getAllColors(req, res));
router.get("/color/:id", (req, res) => mantColorController.getColorById(req, res));
router.put("/color/:id", (req, res) => mantColorController.updateColor(req, res));
router.delete("/color/:id", (req, res) => mantColorController.deleteColor(req, res));

// Rutas para MantMaterial
router.post("/material", (req, res) => mantMaterialController.createMaterial(req, res));
router.get("/material-all", (req, res) => mantMaterialController.getAllMaterials(req, res));
router.get("/material/:id", (req, res) => mantMaterialController.getMaterialById(req, res));
router.put("/material/:id", (req, res) => mantMaterialController.updateMaterial(req, res));
router.delete("/material/:id", (req, res) => mantMaterialController.deleteMaterial(req, res));

// Rutas para MantSize
router.post("/size", (req, res) => mantSizeController.createSize(req, res));
router.get("/size-all", (req, res) => mantSizeController.getAllSizes(req, res));
router.get("/size/:id", (req, res) => mantSizeController.getSizeById(req, res));
router.put("/size/:id", (req, res) => mantSizeController.updateSize(req, res));
router.delete("/size/:id", (req, res) => mantSizeController.deleteSize(req, res));

// Rutas para MantShape
router.post("/shape", (req, res) => mantShapeController.createShape(req, res));
router.get("/shape-all", (req, res) => mantShapeController.getAllShapes(req, res));
router.get("/shape/:id", (req, res) => mantShapeController.getShapeById(req, res));
router.put("/shape/:id", (req, res) => mantShapeController.updateShape(req, res));
router.delete("/shape/:id", (req, res) => mantShapeController.deleteShape(req, res));

router.get("/category-all", (req, res) => mantCategoryController.getAllCategory(req, res));
