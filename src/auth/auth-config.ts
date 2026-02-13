import { LogLevel } from '@azure/msal-browser';

export const msalConfig = {
    auth: {
        clientId: 'e57495d0-8be6-4098-b01c-0293e5a99d44',
        authority: 'https://login.microsoftonline.com/83a672d2-c8cc-460a-b754-8e37feb3f398/',
        redirectUri: '/',
        postLogoutRedirectUri: '/',
        navigateToLoginRequestUrl: false,
    },
    cache: {
        cacheLocation: 'sessionStorage',
        storeAuthStateInCookie: false,
    },
    system: {
        loggerOptions: {
            loggerCallback: (level: any, message: any, containsPii: any) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return; //can be removed 
                    case LogLevel.Verbose:
                        console.debug(message);
                        return; //can be removed 
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                    default:
                        return;
                }
            },
        },
    },
};


export const loginRequest = {
    scopes: [],
};