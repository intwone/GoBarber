import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointment {
  public async execute({ provider, date }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentStartHour = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      date,
    );

    if (findAppointmentInSameDate) {
      throw new Error('This appointment is already booked');
    }

    const appointment = appointmentsRepository.create({
      provider,
      date: appointmentStartHour,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointment;
