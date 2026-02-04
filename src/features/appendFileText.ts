import { AdaptNote } from "models/adaptNote";
import { App, TFile } from "obsidian";

export class AppendFileTextHandler {
    _app: App;

    constructor(app:App) {
        this._app = app;
    }

    private getTextFromNote(note: AdaptNote): string {
        return `\r\n---\r\n# ${note.title}\r\n${note.content}`
    }

    async appendText(file: TFile, content: AdaptNote): Promise<void> {
        const vault = this._app.vault;

        await vault.process(file, (data: string) => {
            return data.concat('\r\n').concat(this.getTextFromNote(content));
        });
    }
}