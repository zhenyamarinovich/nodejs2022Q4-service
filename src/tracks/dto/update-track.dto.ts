import { IsString, IsNotEmpty, IsInt, NotEquals } from 'class-validator';

export class UpdateTrackDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @NotEquals(undefined, {
    message: 'albumId required must be a string or null',
  })
  artistId: string | null;

  @NotEquals(undefined, {
    message: 'albumId required must be a string or null',
  })
  albumId: string | null;

  @IsInt()
  @IsNotEmpty()
  duration: number;
}
