Meri Design House: NestJS & Back-End Mimarisi Geliştirme KılavuzuBu belge, "Meri Design House" projesinin back-end API geliştirme süreçleri için birincil referans kaynağıdır. Amaç, projenin modüler, test edilebilir, güvenli, ölçeklenebilir ve bakımı kolay bir şekilde geliştirilmesini sağlamaktır. Tüm geliştiriciler ve yapay zeka agent'ları bu kurallara uymakla yükümlüdür.1. Modüler Mimari: Özellik Odaklı YapıProje, her biri belirli bir iş alanını (domain) temsil eden modüller halinde organize edilecektir. Bu yaklaşım, kodun yeniden kullanılabilirliğini artırır, ekiplerin farklı özellikler üzerinde aynı anda çalışmasını kolaylaştırır ve projenin bakımını basitleştirir.Her bir özellik modülü, kendi içinde tutarlı bir yapıya sahip olmalıdır. Bu yapı, sorumlulukların net bir şekilde ayrılmasını sağlar.Örnek Dizin Şemasısrc/
├── modules/
│   ├── auth/
│   │   ├── auth.module.ts
│   │   └── guards/
│   │       ├── jwt-auth.guard.ts
│   │       └── roles.guard.ts
│   ├── users/
│   │   ├── users.controller.ts
│   │   ├── users.module.ts
│   │   ├── users.service.ts
│   │   └── dto/
│   │       ├── create-user.dto.ts
│   │       └── update-user.dto.ts
│   ├── products/
│   │   ├── products.controller.ts
│   │   ├── products.module.ts
│   │   ├── products.service.ts
│   │   └── dto/
│   │       └── create-product.dto.ts
│   ├── categories/
│   │   ├── categories.controller.ts
│   │   ├──...
│   ├── orders/
│   │   ├── orders.controller.ts
│   │   ├──...
│   └── messages/
│       ├── messages.gateway.ts
│       ├── messages.module.ts
│       └── messages.service.ts
├── common/
│   ├── decorators/
│   │   └── roles.decorator.ts
│   └── filters/
│       └── http-exception.filter.ts
├── config/
│   └──...
├── prisma/
│   └──...
├── app.module.ts
└── main.ts
modules/: Uygulamanın ana işlevsel birimlerini içerir. Her alt klasör, bir özelliği (feature) temsil eder.common/: Birden fazla modül tarafından paylaşılan genel bileşenleri (guard'lar, filter'lar, decorator'lar vb.) barındırır.2. Sorumlulukların Ayrıştırılması (Separation of Concerns - SoC)Kodun temiz ve anlaşılır kalması için her sınıfın tek bir sorumluluğu olmalıdır.Controller'lar: Sadece Trafik PolisiController'ların tek görevi, gelen HTTP isteklerini almak, gerekli doğrulamaları (DTO validasyonu) yapmak ve ilgili servisi çağırmaktır. Controller'lar kesinlikle iş mantığı (business logic) içermemelidir.TypeScript// src/modules/products/products.controller.ts

import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { Role } from '@/common/enums/role.enum';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin) // Sadece Admin rolüne sahip kullanıcılar erişebilir.
  create(@Body() createProductDto: CreateProductDto) {
    // İş mantığı burada DEĞİL, serviste.
    // Controller sadece isteği alır, DTO'yu doğrular ve servisi çağırır.
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }
}
Servis'ler: İşin BeyniTüm iş mantığı, veritabanı işlemleri (Prisma aracılığıyla) ve harici API çağrıları Servis katmanında yer almalıdır. Servisler, uygulamanın çekirdeğidir ve controller'lardan tamamen bağımsız, yeniden kullanılabilir ve test edilebilir olmalıdır.TypeScript// src/modules/products/products.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    // Tüm iş mantığı burada: Veritabanı etkileşimi, hesaplamalar vb.
    const { name, price, categoryId } = createProductDto;

    // Örneğin, bir slug oluşturma mantığı
    const slug = name.toLowerCase().replace(/\s+/g, '-');

    return this.prisma.product.create({
      data: {
        name,
        price,
        slug,
        categoryId,
      },
    });
  }

  findAll() {
    return this.prisma.product.findMany();
  }
}
3. DTO'lar ve Veri DoğrulamaGelen verinin doğruluğunu ve tutarlılığını sağlamak için tüm POST ve PUT isteklerinde Data Transfer Object (DTO) kullanılacaktır. class-validator ve class-transformer kütüphaneleri bu iş için standarttır.DTO ÖrnekleriTypeScript// src/modules/products/dto/create-product.dto.ts
import { IsString, IsNotEmpty, IsNumber, IsPositive, IsUUID } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsUUID()
  @IsNotEmpty()
  categoryId: string;
}
TypeScript// src/modules/users/dto/update-user.dto.ts
import { IsString, IsOptional, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;
}
Global ValidationPipe AktivasyonuDTO'ların otomatik olarak doğrulanması için ValidationPipe'ı main.ts dosyasında global olarak etkinleştirin. whitelist: true ayarı, DTO'da tanımlanmayan alanların otomatik olarak kaldırılmasını sağlar.TypeScript// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // DTO'da olmayan verileri filtrele
    transform: true, // Gelen veriyi DTO tipine dönüştür
  }));

  await app.listen(3001);
}
bootstrap();
4. Güvenlik En İyi PratikleriKimlik Doğrulama (Authentication): Clerk JWT ile AuthGuardFront-end'den (Next.js) gelen her istek, Clerk tarafından oluşturulan bir JWT (JSON Web Token) içerecektir. Bu token'ı doğrulamak için bir AuthGuard oluşturulmalıdır. Bu guard, token'ı doğrular ve kullanıcı bilgilerini Request nesnesine ekler.TypeScript// src/modules/auth/guards/jwt-auth.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { verifyToken } from '@clerk/backend';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader ||!authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No authentication token provided');
    }

    const token = authHeader.substring(7);

    try {
      const payload = await verifyToken(token, {
        secretKey: process.env.CLERK_SECRET_KEY,
      });
      
      // Kullanıcı bilgilerini request nesnesine ekle
      request.user = payload;
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
Yetkilendirme (Authorization): Rol Tabanlı Erişim Kontrolü (RBAC)Belirli endpoint'lere sadece belirli rollerdeki kullanıcıların erişebilmesi için RolesGuard ve özel bir @Roles decorator'ı oluşturulacaktır.1. Rol Enum'ı ve Decorator'ı OluşturmaTypeScript// src/common/enums/role.enum.ts
export enum Role {
  User = 'user',
  Admin = 'admin',
}

// src/common/decorators/roles.decorator.ts
import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums/role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role) => SetMetadata(ROLES_KEY, roles);
2. RolesGuard OluşturmaBu guard, @Roles decorator'ı ile belirtilen rolleri, JwtAuthGuard tarafından request'e eklenen kullanıcının rolleriyle karşılaştırır.TypeScript// src/modules/auth/guards/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '@/common/decorators/roles.decorator';
import { Role } from '@/common/enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true; // Rol belirtilmemişse erişime izin ver
    }

    const { user } = context.switchToHttp().getRequest();
    
    // Clerk JWT'sindeki rolleri kontrol et (Clerk dashboard'dan ayarlanır)
    const userRoles = user.organizationMemberships?.map(mem => mem.role) ||;

    return requiredRoles.some((role) => userRoles.includes(role));
  }
}
5. Hata Yönetimi (Exception Handling)Uygulama genelinde tutarlı ve standart bir hata formatı sağlamak için global bir HttpExceptionFilter kullanılacaktır. Bu filter, tüm hataları yakalayıp standart bir JSON formatında döndürecektir.TypeScript// src/common/filters/http-exception.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    
    const status =
      exception instanceof HttpException
       ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
       ? exception.message
        : 'Internal server error';

    const errorResponse =
      exception instanceof HttpException? exception.getResponse() : null;

    response.status(status).json({
      success: false,
      statusCode: status,
      message,
      errors: typeof errorResponse === 'object'? (errorResponse as any).message : null,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
Global Filter'ı main.ts'de Etkinleştirme:TypeScript// src/main.ts
//... diğer importlar
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  //... ValidationPipe
  
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3001);
}
bootstrap();
6. Siparişe Özel Mesajlaşma (WebSockets)Gerçek zamanlı mesajlaşma için @nestjs/websockets modülü ve socket.io kullanılacaktır. Her sipariş için özel bir "oda" (room) oluşturularak mesajların sadece ilgili kullanıcı ve admin arasında kalması sağlanacaktır. 1TypeScript// src/modules/messages/messages.gateway.ts
import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { verifyToken } from '@clerk/backend';

@WebSocketGateway({ cors: { origin: '*' } }) // Geliştirme için '*' kullanıldı, production'da front-end URL'i belirtilmelidir.
export class MessagesGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('MessagesGateway');

  afterInit(server: Server) {
    this.logger.log('WebSocket Gateway Initialized');
  }

  async handleConnection(client: Socket,...args: any) {
    try {
      const token = client.handshake.auth.token;
      if (!token) {
        throw new Error('Authentication token not provided');
      }
      const payload = await verifyToken(token, { secretKey: process.env.CLERK_SECRET_KEY });
      client.data.user = payload; // Kullanıcı bilgisini sokete ekle
      this.logger.log(`Client connected: ${client.id} - User: ${payload.sub}`);
    } catch (error) {
      this.logger.error(`Authentication failed: ${error.message}`);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('join_order_room')
  handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() orderId: string,
  ): void {
    client.join(`order_${orderId}`);
    this.logger.log(`Client ${client.id} joined room: order_${orderId}`);
    client.emit('joined_room', `Successfully joined room for order ${orderId}`);
  }

  @SubscribeMessage('send_message_to_order')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { orderId: string; message: string },
  ): void {
    const messageData = {
      userId: client.data.user.sub,
      message: payload.message,
      timestamp: new Date(),
    };

    // Mesajı sadece ilgili siparişin odasındakilere gönder
    this.server.to(`order_${payload.orderId}`).emit('receive_message', messageData);
    this.logger.log(`Message sent to room order_${payload.orderId}`);
  }
}
