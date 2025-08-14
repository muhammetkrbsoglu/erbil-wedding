import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendReservationConfirmation(email: string, data: {
    customerName: string;
    salonName: string;
    eventDate: Date;
    reservationId: string;
  }) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Rezervasyon Onayı - Erbil Wedding',
      template: 'reservation-confirmation',
      context: {
        name: data.customerName,
        salonName: data.salonName,
        eventDate: data.eventDate.toLocaleDateString('tr-TR'),
        reservationId: data.reservationId,
        year: new Date().getFullYear(),
      },
    });
  }

  async sendReservationReminder(email: string, data: {
    customerName: string;
    salonName: string;
    eventDate: Date;
    reservationId: string;
  }) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Rezervasyon Hatırlatması - Erbil Wedding',
      template: 'reservation-reminder',
      context: {
        name: data.customerName,
        salonName: data.salonName,
        eventDate: data.eventDate.toLocaleDateString('tr-TR'),
        reservationId: data.reservationId,
        year: new Date().getFullYear(),
      },
    });
  }

  async sendPasswordReset(email: string, resetToken: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Şifre Sıfırlama - Erbil Wedding',
      template: 'password-reset',
      context: {
        resetLink: `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`,
        year: new Date().getFullYear(),
      },
    });
  }
}
