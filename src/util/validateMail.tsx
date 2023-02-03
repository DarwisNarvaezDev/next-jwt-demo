export default function (email: string){
    // Validate if the email is valid
    const validEmailPattern: RegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*.*$/;   
    if( !validEmailPattern.test(email) ){
        return false;
    }else{
        return true;
    }
}