import styles from "@/styles/loginPage.module.scss";
import Image from "next/image";

const LoginPage = () => {
    return (
        <section className={styles.loginContainer}>
            <h1>
                <span>B</span>link.
            </h1>
            <p>Please login to start chatting.</p>

            <div className={styles.loginButton}>
                <Image
                    src={"/google.svg"}
                    alt="Google logo"
                    width={30}
                    height={30}
                />
                <button type="button">Login with Google</button>
            </div>
        </section>
    );
};

export default LoginPage;
