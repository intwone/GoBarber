import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';

import CreateAppointmentService from '../services/CreateAppointmentService';

const appointementsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointementsRouter.get('/', (request, response) => {
  const allRepository = appointmentsRepository.all();

  return response.json(allRepository);
});

appointementsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService(
      appointmentsRepository,
    );

    const appointment = createAppointment.execute({
      provider,
      date: parsedDate,
    });

    return response.json(appointment);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default appointementsRouter;
