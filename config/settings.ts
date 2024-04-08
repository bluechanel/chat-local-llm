'use client'

class Settings {

    getItem(key: string) {
        return JSON.parse(localStorage.getItem(key) || '{}');
    }

    setItem(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
    }
}

export const setting = new Settings();