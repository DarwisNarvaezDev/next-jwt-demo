import getDb from "@/db/DbService";

interface TypeUserInfo {
    email?: string,
    joined?: string,
    id?: number | null
}

export async function findUser({ email }: TypeUserInfo){
    try{
        if( !email ) throw new Error('No user received in parameters');
        const found = await getDb()("login").where("email", email).returning("*");
        return found;
    }catch(error){
        throw error;
    }
}

export async function checkUser({ email }: TypeUserInfo){
    try{
        if( !email ) throw new Error('No user received in parameters');
        console.log(`Checking if user: ${email} exists.`);
        const users = await getDb()("user").where("email", email);
        let userExists = users.length > 0;
        console.log(`${email} exists ${userExists}.`);
        return userExists;
    }catch(error){
        throw error;
    }
}

export async function saveUser({ email, joined }: TypeUserInfo){
    try{
        if( !email || !joined ) throw new Error('No user received in parameters');
        console.log(`persisting the user ${email}`);
        const users = await getDb()("user").insert({ email, created_at: joined }).returning("*");
        return users;
    }catch(error){
        throw error;
    }
}

export async function findUserById({ id }: TypeUserInfo){
    try{
        if( !id ) throw new Error('No user received in parameters');
        const found = await getDb()("user").where("id", id).returning("*");
        return found;
    }catch(error){
        throw error;
    }
}