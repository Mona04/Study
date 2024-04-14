'use client'

import {useContext, useState, useEffect} from "react"
import {Context} from '@/context/context'

interface Props{
  className? : string | undefined
}

export default function PopupBackground({className}:Props) {
  
	const context = useContext(Context);
  const [nOpenedPopup, setOpenedPopupNum] = useState(0);
	
  useEffect(()=>{
    const disposables : (IDisposable|undefined)[] = [];

    // 버튼 이벤트랑 연결
    disposables.push(context?.statemgr.registMenuEvent(onPopupChanged));
    disposables.push(context?.statemgr.registSearchEvent(onPopupChanged));

    return ()=>{
      disposables.map(v=>v?.dispose());
    }
  }, []);

	const onPopupChanged = (v : boolean) => {
		setOpenedPopupNum(nOpenedPopup + (v === true ? 1 : -1));	
	}

  const onClick = (event:  React.MouseEvent<HTMLElement>) => {
		context?.statemgr.closeAll();
  };

  return (
    /* A fixed-position element without a specified top value 
        defaults to a position that may not be 0, depending on the situation*/
		<>
		  { nOpenedPopup > 0 && 
			  <section className={`${className} tw-z-10  tw-fixed tw-w-full tw-h-full tw-mt-0 tw-top-nav-height tw-opacity-30 tw-bg-color-text-dimmed`}
		      			 onClick={onClick}>
				</section>
			}		
		</>

  );
}