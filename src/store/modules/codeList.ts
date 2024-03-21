// In your Pinia store file (functionStore.ts)
import { defineStore } from "pinia";

const codeListStore = defineStore("codeList", {
  state: (): { codeList: { name: string; id: number }[] } => {
    return {
      codeList: [],
    };
  },
  actions: {
    addOpenWeb(url: string, object: string) {
      const item = {
        name: `打开网页${url},保存网页对象至${object}`,
        id: this.codeList.length,
      };
      this.codeList.push(item);
    },
    addCloseWeb(object: string) {
      const item = {
        name: `关闭网页${object}`,
        id: this.codeList.length,
      };
      this.codeList.push(item)
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
