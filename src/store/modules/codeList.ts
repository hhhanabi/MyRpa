// In your Pinia store file (functionStore.ts)
import { defineStore } from "pinia";

const codeListStore = defineStore("codeList", {
  state: (): { codeList: { name: string; id: number }[] ,currentId:number} => {
    return {
      codeList: [],
      currentId: 1,
    };
  },
  actions: {
    addOpenWeb(url: string, object: string) {
      const item = {
        name: `打开网页${url},保存网页对象至${object}`,
        id: this.currentId++,
      };
      this.codeList.push(item);
    },
    addCloseWeb(object: string) {
      const item = {
        name: `关闭网页${object}`,
        id: this.currentId++,
      };
      this.codeList.push(item)
    },
    addSetVariable(name:string,value:string) {
      const item = {
        name:`设置变量${name} = ${value}`,
        id:this.currentId++
      }
      this.codeList.push(item)
    },
    addWait(time:string){
      const item = {
        name:`等待${time}秒`,
        id:this.currentId++
      }
      this.codeList.push(item)
    },
    addSaveElement(path:string,web:string,element:string) {
      const item = {
        name:`将${web}中${path}对应的元素保存至${element}`,
        id:this.currentId++
      }
      this.codeList.push(item)
    },
    addClick(element:string) {
      const item = {
        name:`点击元素${element}`,
        id:this.currentId++
      }
      this.codeList.push(item)
    },
    addClear(element:string) {
      const item = {
        name:`清空元素${element}`,
        id:this.currentId++
      }
      this.codeList.push(item)
    },
    addReadFile(path:string,element:string) {
      const item = {
        name:`读取对应路径文件${path}至${element}`,
        id:this.currentId++
      }
      this.codeList.push(item)
    },
    addWriteFile(path:string,_content:string) {
      const item = {
        name:`写入对应路径文件${path}`,
        id:this.currentId++
      }
      this.codeList.push(item)
    },
    addDeleteFile(path:string) {
      const item = {
        name:`删除对应路径文件${path}`,
        id:this.currentId++
      }
      this.codeList.push(item)
    },
    getCurrentIds() {
      const array = [];
      for (const code of this.codeList) {
        array.push(code.id)
      }
      return array
    },
    deleteCode(id:number) {
        for (let i = 0; i < this.codeList.length; i++) {
            if (this.codeList[i].id === id) {
                this.codeList.splice(i,1);
                break;
            }
        }
    }
  },
});

export default codeListStore;
