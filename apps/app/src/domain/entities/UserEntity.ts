export class UserEntity {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
