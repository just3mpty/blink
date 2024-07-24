"use client";
import { auth } from "@/config/firebaseConfig";
import styles from "@/styles/loginPage.module.scss";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LoginPage = () => {
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                router.push("/conversations");
            }
        });
        return () => unsubscribe();
    }, [router]);

    const loginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Erreur de connexion: ", error);
        }
    };

    return (
        <section className={styles.loginContainer}>
            <h1>
                <span>B</span>link.
            </h1>
            <p>Please login to start chatting.</p>

            <div onClick={loginWithGoogle} className={styles.loginButton}>
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
