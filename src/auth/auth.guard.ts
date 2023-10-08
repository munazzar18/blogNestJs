import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1];
        if (token) {
            try {
                const decoded = this.jwtService.verify(token);
                request.user = decoded; // Set the decoded user information in the request
                return true;
            } catch (error) {
                console.log("Token verification error:", error);
                return false;
            }
        }
        return false;
    }
}