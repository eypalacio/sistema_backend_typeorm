import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, ManyToMany, OneToOne, ManyToOne, CreateDateColumn} from "typeorm";
import { Sistema_Usuarios } from "./sistema_usuarios.entity";


@Entity() export class Busquedas_Recientes{
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(type=> Sistema_Usuarios)
    id_usuario: number

    @Column()
    busqueda: string

    @CreateDateColumn()
    fecha: any

    @Column()
    cant: number
}