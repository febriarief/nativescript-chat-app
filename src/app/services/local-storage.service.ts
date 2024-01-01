import { Injectable } from "@angular/core";
import { ApplicationSettings } from "@nativescript/core";
import { parsingJson } from '~/app/helpers';

@Injectable()

export class LocalStorageService 
{

    /**
     * Get saved data from local storage
     * 
     * @param key srting
     * @returns any
     */
    get(key: string): any {
        if (!ApplicationSettings.hasKey(key)) return null;
        return parsingJson(ApplicationSettings.getString(key));
    }

    /**
     * Store data to local storage
     * 
     * @param key string
     * @param request any 
     * @returns boolean
     */
    save(key: string, request: any,): boolean {
        request = JSON.stringify(request);
        ApplicationSettings.setString(key, request);
        return true;
    }

    /**
     * Store data to local storage
     * 
     * @param key string
     * @param request any 
     * @returns boolean
     */
    update(key: string, request: any): boolean {
        if (!ApplicationSettings.hasKey(key)) return false;
        this.delete(key);
        this.save(request, key);
        return true;
    }
    
    /**
     * Delete saved data from local storage
     * 
     * @param key string
     * @returns boolean
     */
    delete(key: string): boolean {
        if (ApplicationSettings.hasKey(key)) {
            ApplicationSettings.remove(key);
            return true;
        } else {
            return false;
        }
    }

    /**
     * Get data boolean to local storage
     * 
     * @param key string
     * @returns boolean
     */
    getBoolean(key: string): boolean {
        return ApplicationSettings.getBoolean(key);
    }

    /**
     * Set data boolean to local storage
     * 
     * @param key string
     * @returns boolean
     */
    setBoolean(key: string, value: boolean): boolean {
        ApplicationSettings.setBoolean(key, value);
        return true;
    }

    clearStorage(): void {
        const protectedKeys = ['fcmToken']
        const localStorage = ApplicationSettings.getAllKeys();
        localStorage.forEach((row) => {
            if (!protectedKeys.includes(row)) ApplicationSettings.remove(row);
        });
    }
}
