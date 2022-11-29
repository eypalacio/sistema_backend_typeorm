import { Entity, PrimaryGeneratedColumn, Column, } from "typeorm";

@Entity() export class Sistema_Usuarios {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable:true})
    sistema: string

    @Column({nullable:true})
    siglas: string

    @Column({nullable:true})
    nombre: string

    @Column({nullable:true})
    usuario: string

    @Column({nullable:true})
    area: string

    @Column({nullable:true})
    rol: string

    @Column({nullable:true})
    activo: string
}