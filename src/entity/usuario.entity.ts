import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm"
import { Rol } from "./rol.entity"

@Entity()
export class Usuario {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    usuario: string

    @Column()
    password: string

    @Column()
    nombre: string

    @CreateDateColumn()
    fecha_registro: Date

    @CreateDateColumn()
    ultima_sesion: Date

    @Column()
    rol: string

}
