import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

const BEARER = 'Bearer';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    try {
      const header = req.headers.authorization;

      const bearer = header.split(' ')[0];
      const token = header.split(' ')[1];

      if (bearer !== BEARER || !token) {
        throw new UnauthorizedException();
      }

      req.user = this.jwtService.verify(token);

      return true;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
