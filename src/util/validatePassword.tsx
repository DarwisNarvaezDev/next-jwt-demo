export default function (password: string){
    const validPassword = password.length > 6;
    if( !validPassword ){
        return false;
    }else{
        return true;
    }
}