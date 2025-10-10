import styles from "./NotificationBanner.module.css";

const NotificationBanner = () => {
    return (
        <div className={styles.notificationBanner}>
            <div className={styles.notificationIcon}>⚠️</div>
            <div className={styles.notificationContent}>
                <h3>Educational Demo - API Service Retired</h3>
                <p>
                    The original Mars Photo API is no longer maintained.
                    This prototype showcases the projects potential for Mars exploration.
                </p>
            </div>
        </div>
    );
};
export default NotificationBanner;