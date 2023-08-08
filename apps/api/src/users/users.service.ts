import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/commom/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async create(email: string, hashedPassword: string) {
    return this.prisma.user.create({
      data: {
        email,
        Password: {
          create: {
            hash: hashedPassword,
          },
        },
      },
    });
  }

  async confirmAccount(userId: number) {
    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        confirmedAt: new Date(),
      },
    });
  }
}
