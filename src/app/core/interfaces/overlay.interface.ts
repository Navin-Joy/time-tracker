import { TemplateRef } from "@angular/core";

export interface IOverlayContent {
    title?: string;
    body: string | TemplateRef<any>;
    confirmText?: string;
    cancelText?: string;
    width?: string, // to be sent in px, if rem used please calculate and send accordingly
}