import { IsInt, IsNotEmpty, IsString, NotEquals } from 'class-validator';

export class UpdateAlbumDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  year: number;

  @NotEquals(undefined, {
    message: 'albumId required must be a string or null',
  })
  artistId: string | null;
}
