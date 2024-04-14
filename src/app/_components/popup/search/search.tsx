import Interact from './search-interact'
import Popup from './search-popup'

export default function SideBar() {
  return (
    <section>
      <Interact>  
        <Popup/>
      </Interact>  
    </section>
  );
}
