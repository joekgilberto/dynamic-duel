import * as superApi from './super-api'
import * as tools from "./tools"

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

export async function getSuper(id,cb){
    try {
        const data = await superApi.show(id)
        tools.checkImage(data.image.url,cb)
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