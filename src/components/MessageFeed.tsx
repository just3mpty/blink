import React from "react";
import styles from "../styles/messageFeed.module.scss";

type Props = React.PropsWithChildren<{}>;

const MessageFeed = ({ children }: Props) => {
    return <div className={styles.container}>{children}</div>;
};

export default MessageFeed;
