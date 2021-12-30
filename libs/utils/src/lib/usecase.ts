export interface UseCase<T, U> {
  run(params: T): Promise<U>
}
