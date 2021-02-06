import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { parseISO } from 'date-fns';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class ProviderAppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const listProviderAppointments = container.resolve(
      CreateAppointmentService,
    );

    const appointments = await listProviderAppointments.execute({
      date: parsedDate,
      provider_id,
      user_id,
    });

    return response.json(appointments);
  }
}
