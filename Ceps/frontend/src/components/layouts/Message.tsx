import { useState } from "react"
import bus from "../../utils/bus"
import styles from './Message.module.css';

function Message() {
    const [message,setMessage] = useState<string | undefined>('');
    const [type,setType] = useState<string | undefined>('');
    const [visibility,setVisibility] = useState<boolean>(false);

    bus.addListener('flash',({message,type}) => {
        setMessage(message);
        setType(type);
        setVisibility(true);
    })
  return (
    (visibility && <p className={type === 'sucess' ? styles.sucess : styles.erro}>{message}</p>)
  )
}

export default Message