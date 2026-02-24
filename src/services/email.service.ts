export class EmailService {
  static async sendAlert(to: string, subject: string, body: string) {
    // TODO: Integrate with SendGrid, Resend, or SES
    console.log(`[EmailService] Alert to ${to}: ${subject}`)
    console.log(`[EmailService] Body: ${body}`)
  }

  static async sendDowntimeAlert(
    email: string,
    endpointName: string,
    endpointUrl: string,
  ) {
    await EmailService.sendAlert(
      email,
      `🚨 ${endpointName} is DOWN`,
      `Your endpoint ${endpointUrl} is not responding. We detected this at ${new Date().toISOString()}.`,
    )
  }

  static async sendRecoveryAlert(
    email: string,
    endpointName: string,
    endpointUrl: string,
  ) {
    await EmailService.sendAlert(
      email,
      `✅ ${endpointName} is back UP`,
      `Your endpoint ${endpointUrl} has recovered at ${new Date().toISOString()}.`,
    )
  }
}
