import { Entity, PrimaryGeneratedColumn, Column, } from "typeorm";

@Entity() export class Sistema_Usuarios {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nombre_sistema: string

    @Column()
    siglas: string

    @Column()
    nombre_usuario: string

    @Column()
    usuario: string

    @Column()
    area: string

    @Column()
    activo: string
}