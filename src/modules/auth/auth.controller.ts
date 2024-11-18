import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth() {
        // redirect user to Google's authentication page
    }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@Req() req: Request) {
        return {
            message: 'User information from Google',
            user: req.user,
        };
    }
}
