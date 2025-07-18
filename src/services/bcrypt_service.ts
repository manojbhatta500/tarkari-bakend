import bcrypt from "bcrypt";


export async function getHashedPassword(plainPassword:string):Promise<string>{
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    return hashedPassword;
}


export  async function  isCorrectPassword(userPassword: string,hashedPassword: string):Promise<boolean> {
    const isMatch = await bcrypt.compare(userPassword, hashedPassword);
    return isMatch;
}

