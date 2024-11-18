import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import * as bcrypt from 'bcrypt';
import { Order } from '../order/order.entity';
  
  @Entity('users')
  export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column('varchar', { length: 100 })
    name: string;
  
    @Column('varchar', { length: 100 })
    email: string;
  
    @Column('varchar', { length: 250 })
    password: string;
  
    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    created_at: Date;
  
    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updated_at: Date;
  
    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
    deleted_at: Date;

    @OneToMany(() => Order, order => order.user)
    orders: Order[];

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(): Promise<void> {
      if (this.password) {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
      }
    }
  

    async comparePassword(plainPassword: string): Promise<boolean> {
      return bcrypt.compare(plainPassword, this.password);
    }
  }