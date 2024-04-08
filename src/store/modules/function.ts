// In your Pinia store file (functionStore.ts)
import { defineStore } from "pinia";
import codeListStore from "./codeList";
const fs = require("fs");
type CodeItem = { id: number; codes: string[] };
const functionStore = defineStore("function", {
    state: (): {
        visible: any;
        currentCodes: CodeItem[];
        currentFilePath: string;
        currentId: number;
    } => {
        return {
            currentId: 1,
            visible: {
                openWeb: false,
                another_property: false,
                closeWeb: false,
                click:false,
                clear:false,
                saveElement:false,
                readFile:false,
                deleteFile:false,
                writeFile:false,
                input:false,
                createRandomNumber:false,
                getCurrentMousePosition:false,
                keyboardInput:false,
                mouseClick:false,
                moveMouse:false,
                wait:false,
                fileUpload:false,
                explicitlyWait:false,
                // Initialize other properties as needed
            },
            currentCodes: [],
            currentFilePath: "",
        };
    },
    actions: {
        // Method to toggle the visibility of a specific property
        disableVisibility(property: string) {
            this.visible[property] = false;
        },
        enableVisibility(property: string) {
            this.visible[property] = true;
        },

        // Method to set the visibility of a specific property to a given value
        setVisibility({ property, value }: { property: string; value: boolean }) {
            this.visible[property] = value;
        },
        getVisibility(property: string) {
            return this.visible[property];
        },
        addToCurrentCodes(codess: string[]) {
            const codeItem: CodeItem = { id: 0, codes: [] };
            for (const code of codess) {
                codeItem.codes.push(code);
            }
            codeItem.id = this.currentId++;
            this.currentCodes.push(codeItem);
        },
        setCurrentFilePath(path: string) {
            this.currentFilePath = path;
        },
        writeToCurrentFile() {
            const currentIds = codeListStore().getCurrentIds();
            this.adjustCurrentCodes(currentIds)
            const formattedContent = this.currentCodes
                .map((codeArray) => codeArray.codes.join("\n")).join("\n")
            fs.writeFileSync(this.currentFilePath + ".py", formattedContent, "utf-8");
            fs.writeFile(this.currentFilePath+'codes.json', JSON.stringify(this.currentCodes, null, 4), (err: any) => {
                if (err) {
                    console.error('Error writing JSON file:', err);
                    return;
                }
                console.log('Data has been written to data.json');
            });
            const codeList = codeListStore().getCodeList()
            fs.writeFile(this.currentFilePath+'codeList.json', JSON.stringify(codeList, null, 4), (err: any) => {
                if (err) {
                    console.error('Error writing JSON file:', err);
                    return;
                }
                console.log('Data has been written to data.json');
            });
            fs.writeFileSync(this.currentFilePath+'currentId.json', JSON.stringify(this.currentId, null, 4));
        },
        adjustCurrentCodes(currentIds: number[]) {
            // 根据 currentIds 重新调整 currentCodes 的顺序
            let adjustedCodes: CodeItem[] = [];
            adjustedCodes.push(this.currentCodes[0])
            currentIds.forEach((id) => {
                let code = this.currentCodes.find((item) => item.id === id);
                console.log(code);
                if (code) {

                    adjustedCodes.push(code);
                }
            });
            this.currentCodes = adjustedCodes;
        },
        deleteCode(id: number) {
            for (let i = 0; i < this.currentCodes.length; i++) {
                if (this.currentCodes[i].id === id) {
                    this.currentCodes.splice(i, 1);
                    break;
                }
            }
        },
        recoverState() {
            fs.readFile(this.currentFilePath+'codes.json', 'utf8', (err:any, data:any) => {
                if (err) {
                    console.error('Error reading JSON file:', err);
                    return;
                }
                // 解析 JSON 字符串为 JavaScript 对象
                const jsonData = JSON.parse(data);
                this.currentCodes=jsonData
            });
            fs.readFile(this.currentFilePath+'codeList.json', 'utf8', (err:any, data:any) => {
                if (err) {
                    console.error('Error reading JSON file:', err);
                    return;
                }
                // 解析 JSON 字符串为 JavaScript 对象
                const jsonData = JSON.parse(data);
                codeListStore().setCodeList(jsonData)
            });
            try {
                const data = JSON.parse(fs.readFileSync(this.currentFilePath+'currentId.json', 'utf8'));
                this.currentId = data
                codeListStore().setCurrentId(data)
            } catch (err) {
                // 如果文件不存在或出现其他错误，则返回默认值
               console.log("failed to read currentId");
               
            }
        },
        clear() {
            this.currentId=1
            this.currentCodes=[]
            codeListStore().setCodeList([])
        }
    },
});

export default functionStore;
