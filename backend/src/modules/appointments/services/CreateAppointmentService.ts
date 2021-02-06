import { startOfHour, isBefore, getHours } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
// import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  user_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository, // @inject('NotificationsRepository') // private notificationsRepository: INotificationsRepository,
  ) {}

  public async execute({
    provider_id,
    date,
    user_id,
  }: IRequest): Promise<Appointment> {
    const appointmentStartHour = startOfHour(date);

    if (isBefore(appointmentStartHour, Date.now())) {
      throw new AppError("You can't create an appointment in past date");
    }

    if (user_id === provider_id) {
      throw new AppError("You can't create an appointment yourself");
    }

    if (
      getHours(appointmentStartHour) < 8 ||
      getHours(appointmentStartHour) > 17
    ) {
      throw new AppError(
        'You can only create appointments between 8am and 5pm',
      );
    }

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentStartHour,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentStartHour,
    });

    // const dateFormatted = format(appointmentStartHour, "dd/MM/yyyy 'às' HH:mm");

    // await this.notificationsRepository.create({
    //   recipient_id: provider_id,
    //   content: `Novo agendamento para dia ${dateFormatted}`,
    // });

    return appointment;
  }
}

export default CreateAppointmentService;
