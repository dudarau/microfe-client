import { AppsManager, MicroApp, MicroAppDef } from './AppsManager';

class Loader {
    private loadingList: string[] = [];
    private apiUrl: string;

    constructor(private appsManager: AppsManager, private config: { [key: string]: any }) {
        this.apiUrl = config.registryApi;
        appsManager.subscribe(this.onNotFoundApp.bind(this));
    }

    onNotFoundApp(appList: MicroAppDef[]) {
        appList.forEach(({ name }) => {
            if (this.loadingList.indexOf(name) === -1) {
                this.loadingList.push(name);
                this.fetchMicroApp(name);
            }
        });
    }

    load(microAppName: string, appContent: string) {
        const script = document.createElement('script');
        const inlineScript = document.createTextNode(appContent);
        script.type = 'text/javascript';
        script.id = microAppName;
        script.appendChild(inlineScript);
        document.getElementsByTagName('head')[0].appendChild(script);
    }

    fetchMicroApp(microAppName: string) {
        if (!window || !window['fetch']) {
            return;
        }
        fetch(`${this.apiUrl}/registry/${microAppName}`)
            .then(result => Promise.all([result.clone().text(), result.blob().then(blob => blob.type)]))
            .then(([fileContent, type]) => {
                switch (type) {
                    case 'text/css':
                        // inject to header
                        break;
                    case 'application/javascript':
                        this.load(microAppName, fileContent);
                        break;
                }
            });
    }
}

export const ResourceLoader: MicroApp = {
    deps: ['Config'],
    name: 'Loader',
    initialize: function(Config, AppsManager) {
        return new Loader(AppsManager, Config);
    },
};
