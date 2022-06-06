import { ICreateMessagingService } from '@/data/contracts'

import * as OneSignal from '@onesignal/node-onesignal'

export class OneSignalMessagingService implements ICreateMessagingService {
  constructor(
    private readonly client: OneSignal.DefaultApi,
    private readonly appId: string,
  ) {}

  async create({
    title,
    body,
    data,
    topics,
  }: ICreateMessagingService.Input): Promise<ICreateMessagingService.Output> {
    await this.client.createNotification({
      app_id: this.appId,
      headings: { en: title },
      contents: { en: body },
      data,
      included_segments: topics || ['Subscribed Users'],
    })
  }
}
