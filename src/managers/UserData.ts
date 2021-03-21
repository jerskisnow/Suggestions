import PostgreSQL from '../structures/PostgreSQL';

export const registerUser = async (id: string) => {
    await PostgreSQL.runQuery('INSERT INTO users (id, receive_dm) VALUES ($1::text, $2::boolean)', [id, true]);
}

export const getUserValue = async (id: string, key: string) => {
    const res = await PostgreSQL.runQuery(`SELECT ${key} FROM users WHERE id = $1::text`, [id]);
    if (res.rowCount === 0) return null;
    else return res;
}

export const setUserValue = async (id: string, key: string, value: any) => {
    await PostgreSQL.runQuery(`UPDATE users SET ${key} = $1 WHERE id = $2`, [value, id]);
}

export const registerAndSetDM = async (id: string, value: boolean) => {
    await PostgreSQL.runQuery('INSERT INTO users (id, receive_dm) VALUES ($1::text, $2::boolean)', [id, value]);
}
