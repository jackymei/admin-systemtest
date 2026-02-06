import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from '../user/user.service'
import { LoginDto } from './dto/auth.dto'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username)
    if (!user) {
      throw new UnauthorizedException('用户不存在')
    }

    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      throw new UnauthorizedException('密码错误')
    }

    const { password: _, ...result } = user
    return result
  }

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto.username, dto.password)
    
    const payload = { sub: user.id, username: user.username, roles: user.roles }
    return {
      accessToken: this.jwtService.sign(payload),
      expiresIn: '7d',
    }
  }
}
