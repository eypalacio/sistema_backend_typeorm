import { type } from "os"
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, ManyToMany } from "typeorm"
import { Usuario } from "./usuario.entity"

@Entity()
export class Rol {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique:true, nullable:true})
    nombre_rol: string
}