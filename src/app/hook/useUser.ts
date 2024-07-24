import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

const useUserInfo = (userId: string | null) => {
    const [userInfo, setUserInfo] = useState<{
        displayName: string;
        photoURL: string;
    } | null>(null);

    useEffect(() => {
        if (!userId) return;

        const fetchUserInfo = async () => {
            const userDoc = doc(db, "users", userId);
            const userSnapshot = await getDoc(userDoc);
            if (userSnapshot.exists()) {
                setUserInfo(
                    userSnapshot.data() as {
                        displayName: string;
                        photoURL: string;
                    }
                );
            }
        };

        fetchUserInfo();
    }, [userId]);

    return userInfo;
};

export default useUserInfo;
