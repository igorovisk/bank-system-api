import { Request, Response, NextFunction } from 'express';
import { TransactionLogic } from '../logic/transaction.logic';



export class TransactionController {
    private logic: TransactionLogic
    
    constructor(){
        this.logic = new TransactionLogic()
    }

    async createTransaction(req: Request, res: Response, next: NextFunction){
        const response = await this.logic.create(req, res, next)
        return response
}
}