
export default (data)=> {
    let errors = {};

    if(!data.email.includes('@')){
        errors.e1 = 'Ingrese un email valido!'
    }
    if(!data.email) errors.e2='Ingresa un email por favor!';

    if(data.email.length > 35) errors.e3 = 'Solo se aceptan hasta 35 caracteres!';

    if(!/\d/.test(data.password)) errors.p1 = 'La contraseña debe terner por lo menos un número!';

    if(data.password.length < 6 || data.password.length > 10) errors.p2 = 'La contraseña debe tenerr una longitud entre 6 y 10 caracteres'

    return errors;
};