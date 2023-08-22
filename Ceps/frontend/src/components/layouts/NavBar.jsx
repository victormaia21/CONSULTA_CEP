import styles from './NavBar.module.css';
import { Link } from 'react-router-dom'



function NavBar() {
  return (
    <header className={styles.header}>
        <nav>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/login'>Login</Link></li>
            </ul>
        </nav>
    </header>
  )
}

export default NavBar