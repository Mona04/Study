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



export async function copyToClipboard(text:string) {  
  // https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
  // https 를 사용하는 일정 버전 이상의 브라우저
  if(navigator.clipboard)
    {
      await navigator.clipboard.writeText(text);
    }
    else{
      if (!document.queryCommandSupported("copy")) {
        return alert("Clipboard is not supported!!!");
      }
      
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      
      // avoid scrolling to bottom
      textarea.style.top = "0";
      textarea.style.left = "0";
      textarea.style.position = "fixed";

      textarea.focus(); // support safari? browser
      textarea.select();

      if (!document.execCommand("copy")){
        return alert("Clipboard is not supported!!!");        
      }

      document.body.removeChild(textarea);
    }
}