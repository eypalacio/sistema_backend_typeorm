import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, ManyToMany, OneToOne } from "typeorm"

@Entity() export class Sistema_Caracteristicas{
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique:true})
    sistema: string    
    
    @Column({nullable:true})
    siglas: string

    @Column({length:2000})
    descripcion: string

    @Column()
    desarrollador: string

    @Column({nullable:true})
    lenguaje_programacion: string

    @Column({nullable:true})
    tipo: string

    @Column({nullable:true})
    url: string

    @Column({nullable:true})
    servidor_aplicacion: string

    @Column({nullable:true})
    base_datos: string

    @Column({nullable:true})
    tipo_db: string

    @Column({nullable:true})
    servidor_base_datos: string

    @Column({nullable:true})
    areas_usuarias: string

    @Column({nullable:true})
    administrador: string

    @Column({nullable:true})
    soporte: string
}