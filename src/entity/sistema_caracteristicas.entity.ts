import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, ManyToMany, OneToOne } from "typeorm"

@Entity() export class Sistema_Caracteristicas{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    sistema: string    
    
    @Column()
    siglas: string

    @Column()
    descripcion: string

    @Column()
    desarrollador: string

    @Column()
    lenguaje_programacion: string

    @Column()
    tipo: string

    @Column()
    url: number

    @Column()
    servidor_aplicacion: string

    @Column()
    base_datos: string

    @Column()
    servidor_base_datos: string

    @Column()
    areas_usuarias: string

    @Column()
    administrador: string
}