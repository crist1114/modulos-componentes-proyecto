const { Observable } = require('rxjs')
const { filter } = require('rxjs/operators')
//PROMESAS
const doSomething = ()=> {
    return new Promise((resolve) => {
        resolve('valor 1')
    })
}
(async ()=>{

    const rta = await doSomething();
    console.log(rta)
})()

//OBSERVABLES
const doSomething$ = ()=> {
    return new Observable(observer =>{
        observer.next('valor 1 $')
        observer.next(null)
        observer.next('valor 3 $')
    })
}

(async ()=>{
    const obs$ = doSomething$();
    obs$
    .pipe(  //pipe nos ayuda a transformar datos en este caso filtrarlos
        filter(value => value!==null)
    )
    .subscribe(rta =>{
        console.log(rta)
    })
})()
