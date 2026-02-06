import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/auth.dto'
import { JwtAuthGuard } from './guards/jwt-auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto)
  }

  @Post('logout')
  async logout() {
    return { success: true }
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async getUser() {
    return { success: true }
  }
}
