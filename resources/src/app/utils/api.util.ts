import {trim, trimEnd, trimStart} from "lodash";

export class ApiUtil {

    static getApiUrl(base: string, path: string = ""): string {

        const meta: Element | null = document.querySelector('base[href]');

        return trimEnd(meta!!.getAttribute("href") || "", "/") + "/api/" + trim(base, "/") + "/" + trimStart(path, "/");
    }

}
