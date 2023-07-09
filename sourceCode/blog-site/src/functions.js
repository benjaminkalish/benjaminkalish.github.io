import React from "react";
const defaultAbortController = new AbortController();

export async function fido(url, callback, abortController = defaultAbortController, errorCallback = function () { }) {
    try {
        const response = await fetch(url, { signal: abortController.signal });
        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return callback(data);
    } catch (e) {
        if (e.name === 'AbortError') {
            console.log(`fetch cancelled: ${e.message}`);
        }
        else {
            let errorText = errorTextGenerator(e);
            console.error(errorText);
            errorCallback(<h2 className="error">{errorText}</h2>);
        }
    }
}

export function errorTextGenerator(e) {
    return `Sorry: ${e.message} ¯\\_(ツ)_/¯`;
}

export function getLength(data) {
    return data.length;
}