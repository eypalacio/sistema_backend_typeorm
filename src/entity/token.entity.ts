import { Entity, PrimaryGeneratedColumn, Column, OneToOne, } from "typeorm";
import { Usuario } from "./usuario.entity";

@Entity() export class Token {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    token: string

    @OneToOne(type => Usuario)
    usuario_id: number
}