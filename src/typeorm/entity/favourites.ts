import { Entity, PrimaryColumn, JoinTable, ManyToMany, ManyToOne, JoinColumn, Column } from "typeorm";
import { Artist } from "./artists";
import { Track } from "./tracks";
import { Album } from "./albums";

@Entity()
export class Favorites {

  @PrimaryColumn()
  userId: number;

  @ManyToMany(() => Artist, { eager: true })
  @JoinTable()
  artists: Artist[];

  @ManyToMany(() => Album, { eager: true })
  @JoinTable({})
  albums: Album[];

  @ManyToMany(() => Track, { eager: true })
  @JoinTable()
  tracks: Track[];

}
