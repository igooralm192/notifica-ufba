export interface ITransaction {
  open: () => Promise<void>
  close: () => Promise<void>
  commit: () => Promise<void>
  rollback: () => Promise<void>
}
