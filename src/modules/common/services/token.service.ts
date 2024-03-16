import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Permission } from "src/models/permissions.model";
import { Token } from "src/models/token.model";
import { FindManyOptions, FindOptionsWhere, Like, Repository } from "typeorm";

@Injectable()
export class TokenService {
    constructor(@InjectRepository(Token) private readonly _m_Token: Repository<Token>){

    }

    async findById(id: number): Promise<Token | null> {
        return await this._m_Token.findOne({ where: { id: id } });
    }

    async create(token: Partial<Token>): Promise<Token> {
        const newToken = this._m_Token.create(token);
        return await this._m_Token.save(newToken);
    }


    async destroy(id: number) {
        const token: Token = await this._m_Token.findOne({ where: { id: id } });
        return await this._m_Token.delete(token)
    }

    async clearExpiredTokens(){
        await this._m_Token
        .createQueryBuilder('tokens')
        .delete()
        .from(Token)
        .where('ac_token_expires_at < :currentDate AND rf_token_expires_at < :currentDate', { currentDate: new Date().getTime() }).execute()
    }
}