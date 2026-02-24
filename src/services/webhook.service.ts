export class WebhookService {
  static async send(url: string, payload: Record<string, unknown>) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(10_000),
      })

      return { success: response.ok, status: response.status }
    } catch (error) {
      console.error(`[WebhookService] Failed to send to ${url}:`, error)
      return { success: false, status: 0 }
    }
  }

  static async sendDowntimeAlert(
    webhookUrl: string,
    endpointName: string,
    endpointUrl: string,
  ) {
    return WebhookService.send(webhookUrl, {
      event: 'endpoint.down',
      endpoint: { name: endpointName, url: endpointUrl },
      timestamp: new Date().toISOString(),
    })
  }
}
