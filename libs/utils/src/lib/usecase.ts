export interface UseCase<T = void, U = void> {
  run(params: T): Promise<U>
}
