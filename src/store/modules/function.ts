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
                saveElement:false
                // Initialize other properties as needed
            },
            currentCodes: [
                {
                    id: 0,
                    codes: [
                        "from selenium import webdriver",
                        "from selenium.webdriver.chrome.options import Options",
                        "from selenium.webdriver.common.by import By",
                        "chrome_options = Options()",
                        'chrome_options.add_experimental_option("detach", True)',
                        `chrome_options.add_experimental_option("debuggerAddress", "127.0.0.1:9222")`
                    ],
                },
            ],
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
    },
});

export default functionStore;
