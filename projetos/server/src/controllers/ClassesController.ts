import {Request, Response } from 'express';// a gente importou isso aki pq o typescript em si  nao entende ai por isso faz aquela atribuical na linha 14

import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';

interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
}

export default class ClassesController {
    //index é o list
    async index(request: Request, response: Response){
        const filters = request.query;

        const subject = filters.subject as string;
        const week_day = filters.week_day as string;
        const time = filters.time as string;

        if(!filters.week_day || !filters.subject || !filters.time){
            return response.status(400).json({
                error: 'Missing filters to search classes'      
            })
        }

        const timeInMinutes = convertHourToMinutes(time);

        /**aki ta puxando os dados  do usuario*/
        const classes = await db('classes')
        .whereExists(function() {
            this.select('class_schedule.*')
                .from('class_schedule')
                .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
                .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
                .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
                
            })
        .where('classes.subject', '=', subject)
        .join('users', 'classes.user_id', '=', 'users.id')
        .select(['classes.*', 'users.*']);
    

        return response.json(classes);
    }

    async create (request: Request, response: Response) {
        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = request.body;
    
        const trx = await db.transaction();//aki estamos usando esse modo transaction para evitar problemas caso ocorrer algum erro durante ums dos inserts, assim se der um erro no meio do caminho nao vai ficar com os dados bugados no banco
    
        try {
            const insertedUsersIds = await trx('users').insert({
                name,
                avatar,
                whatsapp,
                bio,
            });
        
            const user_id = insertedUsersIds[0];// inserteduseresids volta uma lista e ai por isso aki esta pegando na posicao 0
            //o insert permite inserir varios registros ao mesmo tempo, mas aki no caso a gente so esta inserindo 1 
        
            const insertedClassesIds = await trx('classes').insert({
                subject,
                cost,
                user_id,
            });
        
            const class_id = insertedClassesIds[0];
        
            const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
                return {
                    class_id,
                    week_day : scheduleItem.week_day,
                    from : convertHourToMinutes(scheduleItem.from),
                    to : convertHourToMinutes(scheduleItem.to)
                }
            })
        
            await trx('class_schedule').insert(classSchedule);
        
            await trx.commit();
            
            return response.status(201).send();
        
        } catch (err){
            
            await trx.rollback();
    
            return response.status(400).json({
                error: 'Unexpected error while creating new class'
            })
        } 
    }
}