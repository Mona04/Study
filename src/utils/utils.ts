export function removeExtension(p: string) : string { 
  return p.replace(/\.[^/.]+$/, "")
}

export function getExtension(p: string): string | undefined{
  return p.split('.').pop();
}

export function splitExtension(p: string): [name:string, extension:string] | undefined{
  let pp = p.split('.');
  return pp.length != 2 ? undefined : [pp[0]!, pp[1]!];
}

export function sleep(ms: number){
  return new Promise((r) => setTimeout(r, ms));
}

export function getBasePath() : string {
  if( process.env.NODE_ENV === 'development') // 실제 client 에서는 
  {
    return "";
  }
  else {
    return process.env.NEXT_PUBLIC_BASE_PATH || "";
  }
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

/**
 * 함수로 한번 래핑해서 일정시간마다 함수가 호출 가능하도록 한다.
 * 리턴 값이 함수임에 주의.
 * const myCallbackT = throttle(myCallback, 100);
 * @param callback 
 * @param delayTime 
 * @returns 
 */
export function throttle<T>(callback: (args:T) => void, delayTime: number) {
  let timerId : any = null;

  return (args:T) => {
    if (timerId) return;
    timerId = setTimeout(() => {
      callback(args);
      timerId = null;
    }, delayTime);
  };
};


export function shuffle<T>(input:T[], count:number){
  const datas = input.map(m=>m);
  for (let index = datas.length - 1; index > 0; index--) {
    // 무작위 index 값을 만든다. (0 이상의 배열 길이 값)
    const randomPosition = Math.floor(Math.random() * (index + 1));

    [datas[index], datas[randomPosition]] = [datas[randomPosition]!, datas[index]!]
  }
  return datas.slice(0, count > datas.length ? datas.length : count);
}