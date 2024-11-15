import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    configService : ConfigService,
    private prisma: PrismaService, 
    private jwt : JwtService,
    
  ) 
  {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { email : email}
    })

    console.log('validateUser', email);    

    if (user && user?.password === pass) {
      const { password, ...result } = user;

      return result
    }
   
    return null
  }

  async signin(user:any){
    const payload = { sub: user.id, username: user.userName };
    console.log('login', payload);  
    return {
      access_token : this.jwt.signAsync(payload),
    }
  }

  async login(email:string, password:string){
    const result = await this.validateUser(email, password)

    if(!result) { 
      throw new UnauthorizedException();
    }

    console.log('login', result);
    const payload = { sub: result.id, email: result.email };

    return { 
      token : await this.jwt.signAsync(payload),
      user : result.email
    };
       
  }

  
}
