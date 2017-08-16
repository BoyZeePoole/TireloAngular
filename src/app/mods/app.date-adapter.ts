import { NativeDateAdapter } from "@angular/material";


export class AppDateAdapter extends NativeDateAdapter {

    format(date: Date, displayFormat: Object): string {

        if (displayFormat === 'input') {
            const year = date.getFullYear();
            const month = ("0"+(date.getMonth()+1)).slice(-2);
            const day = ("0" + date.getDate()).slice(-2);
            
            return `${year}/${month}/${day}`;
        } else {
            return date ? date.getFullYear() + "/" + ("0"+(date.getMonth()+1)).slice(-2) + "/" + ("0" + date.getDate()).slice(-2) : '';
            //return date ? ("0" + date.getDate()).slice(-2) + "*" + ("0"+(date.getMonth()+1)).slice(-2) + "*" + date.getFullYear() : '';
            //return date.toString();

            //return date.toISOString();
        }
    }
}