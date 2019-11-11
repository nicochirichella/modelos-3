import { User } from '../types/user';
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

}
