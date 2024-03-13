// In your Pinia store file (functionStore.ts)
import { defineStore } from "pinia";


const codeListStore = defineStore('codeList', {
    state: (): { codeList: { name:string,id:number }[]} => {
        return {
            codeList:[]
        };
    },
    actions: {
         addOpenWeb (url:string,object:string) {
            const item = {
            name:`打开网页${url},保存网页对象至${object}`,
            id:this.codeList.length
        }
        this.codeList.push(item)
        },
}});

export default codeListStore