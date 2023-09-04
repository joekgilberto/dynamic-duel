import * as superApi from './super-api'

export async function getSuper(){
    try {
        const data = await superApi.index()
        return data
    }catch(err){
        return err
    }
}

export async function getSixSupers(){
    try {
        const data = []
        for(let i=0;i<6;i++){
            data.push(await superApi.index())
        }
        return data
    }catch(err){
        return err
    }
}