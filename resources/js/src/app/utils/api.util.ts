import {trim, trimEnd} from "lodash";

export class ApiUtil {

    static getApiUrl(apiBase: string, path: string = ""): string {

        const meta: Element | null = document.querySelector('base[href]');

        const url: URL = new URL("api", meta!!.getAttribute("href") || window.location.origin);

        url.pathname = trimEnd(url.pathname, "/") + "/" + trim(apiBase, "/");
        url.pathname = trimEnd(url.pathname, "/") + "/" + trim(path, "/");

        return trimEnd(url.toString(), "/");
    }

}
