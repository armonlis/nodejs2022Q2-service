import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, JoinColumn, JoinTable } from "typeorm";
import { Album } from "./albums";
import { Artist } from "./artists";

@Entity()
export class Track {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  duration: number;

  @Column({ nullable: true })
  artistId: string | null;

  @ManyToOne(() => Artist, { onDelete: "SET NULL" })
  @JoinColumn()
  artist: Artist;

  @Column({ nullable: true })
  albumId: string | null;

  @ManyToOne(() => Album, { onDelete: "SET NULL" })
  @JoinColumn()
  album: Album;

}