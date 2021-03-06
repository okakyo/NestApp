import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {Prisma,User} from "@prisma/client";
@Injectable()
export class UserService {
    constructor(private prisma:PrismaService){}
    async findOneUser(where:Prisma.UserWhereUniqueInput):Promise<User|null>{
        return this.prisma.user.findUnique({
            where: where, 
            include:{
                introduction:{
                    include:{
                        sns:true
                    }
                }
            }
        })
    }

    async findUsers(params?:{
                skip?: number;
                take?: number;
                cursor?: Prisma.UserWhereUniqueInput;
               
        }):Promise<User[]>{
            const {skip,take,cursor} = params;
            return this.prisma.user.findMany({
                skip,take,cursor
            })
    }

    async createUser(data:Prisma.UserCreateInput):Promise<User|null>{
        return this.prisma.user.create({
            data,
            include:{
                introduction:{
                    include:{
                        sns:true
                    }
                }
            }
        })
    }

    async updateUser(params:{
        where:Prisma.UserWhereUniqueInput,
        data:Prisma.UserUpdateInput
    }):Promise<User>{
        const {where, data }  = params;
        return this.prisma.user.update({
            data,
            where,
            include:{
                introduction:{
                    include:{
                        sns:true
                    }
                }
            }
        });
    }

    async deleteUser(where:Prisma.UserWhereUniqueInput):Promise<User> {
        return this.prisma.user.delete({
            where
        });
    }
}
