import * as superApi from './super-api'

export async function getEightSupers(){
    try {
        const data = []
        for(let i=0;i<8;i++){
            data.push(await superApi.index())
        }
        return data
    }catch(err){
        return err
    }
}

export async function getSuper(id){
    try {
        const data = await superApi.show(id)
        return data
    }catch(err){
        return err
    }
}

export async function searchSuper(string){
    try {
        const data = await superApi.search(string)
        return data
    }catch(err){
        return err
    }
}