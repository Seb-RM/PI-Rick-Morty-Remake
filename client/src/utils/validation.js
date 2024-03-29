
export default (data)=> {
    let errors = {};

    console.log(data.password)
    console.log(data.repeatPassword);

    if(!data.email.includes('@')){
        errors.e1 = 'Ingrese un email valido!'
    }
    if (!data.email.includes('@')) errors.email = 'Ingresa un email válido.';
    if(!data.email) errors.e2='Ingresa un email por favor!';

    if(data.email.length > 35) errors.e3 = 'Solo se aceptan hasta 35 caracteres!';

    if(!/\d/.test(data.password)) errors.p1 = 'La contraseña debe tener por lo menos un número!';

    if(data.password.length < 6 || data.password.length > 10) errors.p2 = 'La contraseña debe tener entre 6 y 10 caracteres'

    if (data.password !== data.repeatPassword) {
        errors.repeatPassword = "Las contraseñas no coinciden.";
    }

    return errors;
};