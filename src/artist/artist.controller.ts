import { Controller, Get, Param, HttpStatus, Res, Post, Body, Put, Delete } from "@nestjs/common";
import { ArtistsService } from "./artist.service";
import { IArtist } from "./interfaces";
import { validate } from "uuid";
import { Response } from "express";
import ResMessages from "../constants/resMessages";
import { CreateArtistDTO } from "./DTO/create-artist.dto";
import validateData from "./validator";
import { ChangeArtistDTO } from "./DTO/change-artist.dto";

@Controller("artists")
export class ArtistsController {
  
  constructor(private artists: ArtistsService) {};

  @Get()
  getAll(): IArtist[] {
    return this.artists.getAll();
  };

  @Get(":id")
  getById(@Param("id") id: string, @Res() response: Response) {
    response.header("Content-Type", "application/json");
    if (!validate(id)) {
      response.statusCode = HttpStatus.BAD_REQUEST;
      response.statusMessage = ResMessages.BAD_REQUEST;
      response.send(ResMessages.INVALID_UUID);
      return;  
    }
    const artist = this.artists.getById(id);
    if (!artist) {
      response.statusCode = HttpStatus.NOT_FOUND;
      response.statusMessage = ResMessages.NOT_FOUND
      response.send(ResMessages.NOT_FOUND);
      return;  
    }
    response.send(artist);
    return; 
  };
  
  @Post() 
  create(@Body() data: CreateArtistDTO, @Res() response: Response) {
    response.header("Content-Type", "application/json");
    if (!validateData(data)) {
      response.statusCode = HttpStatus.BAD_REQUEST;
      response.statusMessage = ResMessages.BAD_REQUEST;
      response.send(ResMessages.INVALID_DATA);
      return;
    }
    response.send(this.artists.create(data));
    return;  
  };

  @Put(":id")
  change(@Body() data: ChangeArtistDTO, @Param("id") id: string, @Res() response: Response) {
    response.header("Content-Type", "application/json");
    if (!validate(id)) {
      response.statusCode = HttpStatus.BAD_REQUEST;
      response.statusMessage = ResMessages.BAD_REQUEST;
      response.send(ResMessages.INVALID_UUID);
      return;
    }
    if (!validateData(data)) {
      response.statusCode = HttpStatus.BAD_REQUEST;
      response.statusMessage = ResMessages.BAD_REQUEST;
      response.send(ResMessages.INVALID_DATA);
      return;
    }
    const artist = this.artists.change(data, id);
    if (!artist) {
      response.statusCode = HttpStatus.NOT_FOUND;
      response.statusMessage = ResMessages.NOT_FOUND
      response.send(ResMessages.NOT_FOUND);
      return; 
    }
    response.send(artist);
    return;
  };

  @Delete(":id")
  delete(@Param("id") id: string, @Res() response: Response) {
    response.header("Content-Type", "application/json");
    if (!validate(id)) {
      response.statusCode = HttpStatus.BAD_REQUEST;
      response.statusMessage = ResMessages.BAD_REQUEST;
      response.send(ResMessages.INVALID_UUID);
      return;
    }
    const result = this.artists.delete(id);
    if (!result) {
      response.statusCode = HttpStatus.NOT_FOUND;
      response.statusMessage = ResMessages.NOT_FOUND
      response.send(ResMessages.NOT_FOUND);
      return;   
    }
    response.send(ResMessages.DELETED);
    return;
  }
};