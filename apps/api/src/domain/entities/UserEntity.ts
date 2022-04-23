export class UserEntity {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public password: string,
    public matriculation: string,
    public course: string,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
