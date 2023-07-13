export function removeExtension(p: string) : string { 
    return p.replace(/\.[^/.]+$/, "")
}
