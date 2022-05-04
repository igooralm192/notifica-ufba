import { IGetCacheStorage } from '@/data/contracts'
import { IAuthStore } from '@/application/stores'
import { ISplashPresenter } from '@/ui/presenters'

export class SplashPresenter implements ISplashPresenter {
  constructor(
    private readonly authStore: IAuthStore,
    private readonly getCacheStorage: IGetCacheStorage,
  ) {}

  async load(): Promise<void> {
    const token = await this.getCacheStorage.get({ key: 'TOKEN' })

    this.authStore.setToken(token)
  }
}
