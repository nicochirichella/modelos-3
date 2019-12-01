import { User } from '../types/user';
import { Caso } from '../types/caso';
import { Authenticate } from '../types/authenticate';
import { knex } from '../knex';

export default class Repository {

    public createUserIfNotExists = async (user: User): Promise<any> => {
        const { id = null, name, last_name, username, password , email } = user;

        const userExists = await this.checkIfUserExists(id);
        if (userExists) {
            return knex.raw(`
            update users SET username = ?, password = ? where id = ?
            `, [username, password, id]);
        }

        return knex.raw(`
                INSERT INTO
                users ( name, last_name, username, password, email)
                VALUES ( ?, ?, ?, ?, ?)
            `, [ name, last_name, username, password, email]);
    };

    public getUserInformation = (id: number): Promise<any> => {
        return knex.raw('SELECT * FROM users WHERE id = ?;', [id])
            .then((resp: any) => {
                if (resp.rows.length === 0) {
                    throw Error('No user');
                }

                return {
                    ...resp.rows[0],
                }
            });
    }

    public guardarSolucion = async (casos: Array<Caso>, email: string): Promise<any> => {
        let casos_id = casos.map(function (caso) {
            return caso.id;
          });
        const solucionExistente = await this.checkSolutionExist(casos_id, email);
        if(!solucionExistente) {
            return knex.raw( `
            INSERT INTO
            soluciones ( user_email, casos_id)
            VALUES (?,?)
        `, [email,casos_id]);
        } else {
            console.log('solucion ya existe')
        }
    }
    
    public checkSolutionExist = (casos_id: Array<number>, email: string): Promise<any> => {
        return knex.raw(`
                SELECT count(*) as found
                FROM soluciones where user_email = ?
                and casos_id = ?;
            `, [email, casos_id])
            .then((resp) => {
                return resp.rows[0].found === '1';
            })
            .catch((e) => {console.log(e); return false});
    }

    public checkIfUserExists = (userId: number): Promise<any> => {
        return knex.raw(`
                SELECT count(*) as found
                FROM users where id = ?;
            `, [userId])
            .then((resp) => {
                return resp.rows[0].found === '1';
            })
            .catch((e) => {console.log(e); return false});
    }

    public getUser = (userId: number): Promise<any> => {
        return knex.raw(`
                SELECT id, name, username
                FROM users where id = ?;
            `, [userId])
            .tap(console.log)
            .then(r => r.rows);
    }

    public authenticate = (authenticate: Authenticate): Promise<any> => {
        let { email , password } = authenticate;
        return knex.raw(`
            SELECT count(*) as found
            FROM users where email = ?
            and password = ?;
        `, [email, password])
        .then((resp) => {
            return resp.rows[0].found === '1';
        })
        .catch((e) => {
            console.log(e);
            return false;
        });
    }

    public getSoluciones = (email: string): Promise<any> => {
        return knex.raw(`
            SELECT id
            FROM soluciones 
            where user_email = ?
            order by id desc
            limit 3
        `, [email]
        )
        .then((resp)=> {
            return resp.rows
        })
        .catch((e) => {
            console.log(e);
            return false;
        })
    }

    public getCasosDeSolucion = (solucion_id: number): Promise<any> => {
        return knex.raw(`
            SELECT casos_id
            FROM soluciones 
            where id = ?
            order by id desc
            limit 3
        `, [solucion_id]
        )
        .then((resp)=> {
            return resp.rows[0]
        })
        .catch((e) => {
            console.log(e);
            return false;
        })
    }

    public getAllCasos = (email: string): Promise<any> => {
        return knex.raw(`
            SELECT id, cliente, vencimiento, ultimo_movimiento, responsable, ganancia
            FROM casos 
            where user_email = ?
            order by id
        `,[email]
        )
        .then((resp) => {
            return resp.rows
        })
        .catch((e) => {
            console.log(e);
            return false;
        });
    }


    public getCasosToOrder = (email: string): Promise<any> => {
        return knex.raw(`
            SELECT id, cliente, vencimiento, ultimo_movimiento, responsable, ganancia, valoracion
            FROM casos 
            where user_email = ?
                and responsable != 'cliente'
            order by id 
        `,[email]
        )
        .then((resp) => {
            return resp.rows
        })
        .catch((e) => {
            console.log(e);
            return false;
        });
    }

    public getCasosPorIds = (casos_ids: Array<number>): Promise<any> => {
        return knex.raw(`
            SELECT id, cliente, vencimiento, ultimo_movimiento, responsable, ganancia
            FROM casos 
            where id = ANY(?)
            order by id
        `,[casos_ids]
        )
        .then((resp) => {
            return resp.rows
        })
        .catch((e) => {
            console.log(e);
            return false;
        });
    }

}
