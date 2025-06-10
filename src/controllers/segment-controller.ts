import { Request, Response } from 'express';
import * as segmentService from '../services/segment.service';

export const createSegment = async (req: Request, res: Response) => {
  const { name } = req.body;
  const tenantId = req.user?.tenantId;

  if (!tenantId) {
    return res.status(400).json({ message: 'Tenant ID ausente' });
  }

  try {
    const segment = await segmentService.createSegment(name, tenantId);
    res.status(201).json(segment);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar segment', error });
  }
};

export const getAllSegments = async (req: Request, res: Response) => {
  const tenantId = req.user?.tenantId;

  if (!tenantId) {
    return res.status(400).json({ message: 'Tenant ID ausente' });
  }

  try {
    const segments = await segmentService.getAllSegments(tenantId);
    res.json(segments);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar segments', error });
  }
};

export const getSegmentById = async (req: Request, res: Response) => {
  try {
    const segment = await segmentService.getSegmentById(req.params.id);
    if (!segment) return res.status(404).json({ message: 'Segment não encontrado' });
    res.json(segment);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar segment', error });
  }
};

export const updateSegment = async (req: Request, res: Response) => {
  try {
    const updated = await segmentService.updateSegment(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar segment', error });
  }
};

export const deleteSegment = async (req: Request, res: Response) => {
  try {
    await segmentService.deleteSegment(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir segment', error });
  }
};
