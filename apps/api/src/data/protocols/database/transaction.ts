export interface Transaction {
  open: () => Promise<void>
  close: () => Promise<void>
  commit: () => Promise<void>
  rollback: () => Promise<void>
}
