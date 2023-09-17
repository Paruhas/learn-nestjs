import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'Users' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'firstname', type: 'varchar', length: 255, nullable: false })
  firstname: string;

  @Column({ name: 'lastname', type: 'varchar', length: 255, nullable: false })
  lastname: string;

  @Column({ name: 'email', type: 'varchar', length: 255, nullable: false })
  email: string;

  @Column({ name: 'age', type: 'integer', length: 5, nullable: false })
  age: number;

  @Column({ name: 'tel', type: 'varchar', length: 20, nullable: false })
  tel: string;

  // @Column({ name: 'isActive', type: 'boolean', length: 1, nullable: false })
  // isActive: boolean;

  @Column({ name: 'createdAt', type: 'varchar', length: 255, nullable: false })
  createdAt: string;
}
