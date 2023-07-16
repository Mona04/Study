export function removeExtension(p: string) : string { 
    return p.replace(/\.[^/.]+$/, "")
}

export function getExtension(p: string): string | undefined{
    return p.split('.').pop();
}

export function splitExtension(p: string): [name:string, extension:string] | undefined{
    let pp = p.split('.');
    return pp.length != 2 ? undefined : [pp[0], pp[1]];
}

export function sleep(ms: number){
    return new Promise((r) => setTimeout(r, ms));
}