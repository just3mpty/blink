import Image from "next/image";
import styles from "../styles/navbar.module.scss";

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.user}>
                <Image
                    src={"/favicon.png"}
                    alt="User's profil picture"
                    width={30}
                    height={30}
                />
                <span>Username</span>
            </div>
            <button type="button" className={styles.button}>
                +
            </button>
        </nav>
    );
};

export default Navbar;
