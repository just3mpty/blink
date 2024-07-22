import Image from "next/image";
import styles from "../styles/navbar.module.scss";

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.user}>
                <Image
                    src={"/3mpty.png"}
                    alt="User's profil picture"
                    width={30}
                    height={30}
                />
                <span>3mpty</span>
            </div>
            <div className={styles.buttons}>
                <button type="button" className={styles.button}>
                    +
                </button>
                <button type="button" className={styles.button}>
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
