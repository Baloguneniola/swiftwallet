import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    ArrowLeft,
    ShieldCheck,
    Smartphone,
    Bell,
    LockKeyhole,
    LogOut,
    ChevronRight,
    AlertTriangle,
    CheckCircle2,
} from "lucide-react";

function ManageAccountProtection() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [twoFactor, setTwoFactor] = useState(false);
    const [loginNotifications, setLoginNotifications] = useState(true);
    const [transactionNotifications, setTransactionNotifications] =
        useState(true);
    const [securityAlerts, setSecurityAlerts] = useState(true);

    const currentUser =
        JSON.parse(localStorage.getItem("swiftWalletCurrentUser")) || {};

    const userName = currentUser.name || "User";

    const handleLogoutOtherDevices = () => {
        const confirmed = window.confirm(
            "Are you sure you want to log out of all other devices?"
        );

        if (confirmed) {
            alert("All other devices have been logged out.");
        }
    };

    const handleDeactivateAccount = () => {
        const confirmed = window.confirm(
            "Are you sure you want to deactivate your Swift Wallet account?"
        );

        if (confirmed) {
            alert("Your account has been marked for deactivation.");
        }
    };

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <div style={styles.header}>
                    <Link to="/settings" style={styles.backButton}>
                        <ArrowLeft size={20} />
                    </Link>

                    <div>
                        <h1 style={styles.title}>
                            Manage Account Protection
                        </h1>

                        <p style={styles.subtitle}>
                            Keep your Swift Wallet account secure
                        </p>
                    </div>
                </div>

                <div style={styles.securityStatus}>
                    <div style={styles.statusIcon}>
                        <ShieldCheck size={28} />
                    </div>

                    <div style={styles.statusContent}>
                        <div style={styles.statusTitle}>
                            <span>Your account is protected</span>
                            <CheckCircle2 size={18} />
                        </div>

                        <p style={styles.statusText}>
                            Your account has security features enabled to help
                            protect your money and personal information.
                        </p>
                    </div>
                </div>

                <section style={styles.section}>
                    <h2 style={styles.sectionTitle}>
                        Login & Account Security
                    </h2>

                    <div style={styles.card}>
                        <div style={styles.settingRow}>
                            <div style={styles.settingIcon}>
                                <LockKeyhole size={21} />
                            </div>

                            <div style={styles.settingContent}>
                                <h3 style={styles.settingTitle}>
                                    Two-Factor Authentication
                                </h3>

                                <p style={styles.settingDescription}>
                                    Add an extra layer of protection when
                                    signing in.
                                </p>
                            </div>

                            <button
                                onClick={() => setTwoFactor(!twoFactor)}
                                style={{
                                    ...styles.toggle,
                                    ...(twoFactor
                                        ? styles.toggleActive
                                        : {}),
                                }}
                                aria-label="Toggle two-factor authentication"
                            >
                                <span
                                    style={{
                                        ...styles.toggleCircle,
                                        ...(twoFactor
                                            ? styles.toggleCircleActive
                                            : {}),
                                    }}
                                />
                            </button>
                        </div>

                        <div style={styles.divider} />

                        <div style={styles.settingRow}>
                            <div style={styles.settingIcon}>
                                <Bell size={21} />
                            </div>

                            <div style={styles.settingContent}>
                                <h3 style={styles.settingTitle}>
                                    Login Notifications
                                </h3>

                                <p style={styles.settingDescription}>
                                    Get notified whenever your account is
                                    accessed.
                                </p>
                            </div>

                            <button
                                onClick={() =>
                                    setLoginNotifications(
                                        !loginNotifications
                                    )
                                }
                                style={{
                                    ...styles.toggle,
                                    ...(loginNotifications
                                        ? styles.toggleActive
                                        : {}),
                                }}
                                aria-label="Toggle login notifications"
                            >
                                <span
                                    style={{
                                        ...styles.toggleCircle,
                                        ...(loginNotifications
                                            ? styles.toggleCircleActive
                                            : {}),
                                    }}
                                />
                            </button>
                        </div>
                    </div>
                </section>

                <section style={styles.section}>
                    <h2 style={styles.sectionTitle}>
                        Transaction Protection
                    </h2>

                    <div style={styles.card}>
                        <div style={styles.settingRow}>
                            <div style={styles.settingIcon}>
                                <ShieldCheck size={21} />
                            </div>

                            <div style={styles.settingContent}>
                                <h3 style={styles.settingTitle}>
                                    Transaction PIN
                                </h3>

                                <p style={styles.settingDescription}>
                                    Your transactions are protected with your
                                    security PIN.
                                </p>
                            </div>

                            <div style={styles.enabledBadge}>
                                Enabled
                            </div>
                        </div>

                        <div style={styles.divider} />

                        <div style={styles.settingRow}>
                            <div style={styles.settingIcon}>
                                <Bell size={21} />
                            </div>

                            <div style={styles.settingContent}>
                                <h3 style={styles.settingTitle}>
                                    Transaction Notifications
                                </h3>

                                <p style={styles.settingDescription}>
                                    Receive notifications when transactions
                                    are completed.
                                </p>
                            </div>

                            <button
                                onClick={() =>
                                    setTransactionNotifications(
                                        !transactionNotifications
                                    )
                                }
                                style={{
                                    ...styles.toggle,
                                    ...(transactionNotifications
                                        ? styles.toggleActive
                                        : {}),
                                }}
                                aria-label="Toggle transaction notifications"
                            >
                                <span
                                    style={{
                                        ...styles.toggleCircle,
                                        ...(transactionNotifications
                                            ? styles.toggleCircleActive
                                            : {}),
                                    }}
                                />
                            </button>
                        </div>

                        <div style={styles.divider} />

                        <div style={styles.settingRow}>
                            <div style={styles.settingIcon}>
                                <AlertTriangle size={21} />
                            </div>

                            <div style={styles.settingContent}>
                                <h3 style={styles.settingTitle}>
                                    Security Alerts
                                </h3>

                                <p style={styles.settingDescription}>
                                    Receive alerts about important security
                                    activity.
                                </p>
                            </div>

                            <button
                                onClick={() =>
                                    setSecurityAlerts(!securityAlerts)
                                }
                                style={{
                                    ...styles.toggle,
                                    ...(securityAlerts
                                        ? styles.toggleActive
                                        : {}),
                                }}
                                aria-label="Toggle security alerts"
                            >
                                <span
                                    style={{
                                        ...styles.toggleCircle,
                                        ...(securityAlerts
                                            ? styles.toggleCircleActive
                                            : {}),
                                    }}
                                />
                            </button>
                        </div>
                    </div>
                </section>

                <section style={styles.section}>
                    <h2 style={styles.sectionTitle}>
                        Devices & Sessions
                    </h2>

                    <div style={styles.card}>
                        <div style={styles.sessionRow}>
                            <div style={styles.deviceIcon}>
                                <Smartphone size={22} />
                            </div>

                            <div style={styles.settingContent}>
                                <h3 style={styles.settingTitle}>
                                    Current Device
                                </h3>

                                <p style={styles.settingDescription}>
                                    You are currently signed in on this
                                    device.
                                </p>

                                <span style={styles.currentBadge}>
                                    Active now
                                </span>
                            </div>
                        </div>

                        <div style={styles.divider} />

                        <button
                            onClick={handleLogoutOtherDevices}
                            style={styles.actionRow}
                        >
                            <div style={styles.actionIcon}>
                                <LogOut size={21} />
                            </div>

                            <div style={styles.settingContent}>
                                <h3 style={styles.settingTitle}>
                                    Log Out of Other Devices
                                </h3>

                                <p style={styles.settingDescription}>
                                    Sign out of Swift Wallet on all other
                                    devices.
                                </p>
                            </div>

                            <ChevronRight
                                size={20}
                                style={styles.chevron}
                            />
                        </button>
                    </div>
                </section>

                <section style={styles.section}>
                    <h2 style={styles.sectionTitle}>
                        Security Activity
                    </h2>

                    <div style={styles.activityCard}>
                        <div style={styles.activityItem}>
                            <div style={styles.activityDot} />

                            <div>
                                <h3 style={styles.activityTitle}>
                                    Account security checked
                                </h3>

                                <p style={styles.activityText}>
                                    Your security settings are currently
                                    active.
                                </p>
                            </div>
                        </div>

                        <div style={styles.activityItem}>
                            <div style={styles.activityDot} />

                            <div>
                                <h3 style={styles.activityTitle}>
                                    Transaction protection
                                </h3>

                                <p style={styles.activityText}>
                                    Your transaction PIN is enabled.
                                </p>
                            </div>
                        </div>

                        <div
                            style={{
                                ...styles.activityItem,
                                ...styles.activityItemLast,
                            }}
                        >
                            <div style={styles.activityDot} />

                            <div>
                                <h3 style={styles.activityTitle}>
                                    Account owner
                                </h3>

                                <p style={styles.activityText}>
                                    {userName}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section style={styles.dangerSection}>
                    <h2 style={styles.dangerTitle}>
                        Danger Zone
                    </h2>

                    <div style={styles.dangerCard}>
                        <div style={styles.dangerRow}>
                            <div style={styles.dangerContent}>
                                <h3 style={styles.dangerActionTitle}>
                                    Deactivate Account
                                </h3>

                                <p style={styles.dangerDescription}>
                                    Temporarily disable your Swift Wallet
                                    account.
                                </p>
                            </div>

                            <button
                                onClick={handleDeactivateAccount}
                                style={styles.deactivateButton}
                            >
                                Deactivate
                            </button>
                        </div>
                    </div>
                </section>
            </div>

            <style>{`
                @media (max-width: 700px) {
                    .security-container {
                        padding: 24px 18px !important;
                    }

                    .security-header {
                        gap: 12px !important;
                    }

                    .security-title {
                        font-size: 24px !important;
                    }

                    .security-setting-row {
                        align-items: flex-start !important;
                    }

                    .security-setting-content {
                        padding-right: 8px !important;
                    }

                    .security-toggle {
                        flex-shrink: 0 !important;
                    }

                    .security-danger-row {
                        flex-direction: column !important;
                        align-items: flex-start !important;
                        gap: 18px !important;
                    }
                }
            `}</style>
        </div>
    );
}

const styles = {
    page: {
        minHeight: "100vh",
        background: "#000000",
        padding: "32px 20px 60px",
        fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        color: "#ffffff",
    },

    container: {
        maxWidth: "900px",
        margin: "0 auto",
    },

    header: {
        display: "flex",
        alignItems: "center",
        gap: "18px",
        marginBottom: "30px",
    },

    backButton: {
        width: "42px",
        height: "42px",
        borderRadius: "12px",
        background: "#111111",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#ffffff",
        textDecoration: "none",
        border: "1px solid #262626",
        flexShrink: 0,
    },

    title: {
        margin: 0,
        fontSize: "28px",
        fontWeight: "700",
        letterSpacing: "-0.5px",
        color: "#ffffff",
    },

    subtitle: {
        margin: "5px 0 0",
        color: "#8b8b8b",
        fontSize: "15px",
    },

    securityStatus: {
        display: "flex",
        alignItems: "center",
        gap: "18px",
        background: "#101814",
        border: "1px solid #1d3a29",
        borderRadius: "18px",
        padding: "22px",
        marginBottom: "34px",
    },

    statusIcon: {
        width: "52px",
        height: "52px",
        borderRadius: "15px",
        background: "#163222",
        color: "#22c55e",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
    },

    statusContent: {
        flex: 1,
    },

    statusTitle: {
        display: "flex",
        alignItems: "center",
        gap: "7px",
        color: "#4ade80",
        fontSize: "17px",
        fontWeight: "700",
    },

    statusText: {
        margin: "5px 0 0",
        color: "#9ca3af",
        fontSize: "14px",
        lineHeight: "1.5",
    },

    section: {
        marginBottom: "32px",
    },

    sectionTitle: {
        margin: "0 0 12px 3px",
        fontSize: "16px",
        fontWeight: "700",
        color: "#d4d4d4",
    },

    card: {
        background: "#111111",
        border: "1px solid #262626",
        borderRadius: "17px",
        overflow: "hidden",
    },

    settingRow: {
        display: "flex",
        alignItems: "center",
        gap: "15px",
        padding: "20px",
    },

    settingIcon: {
        width: "42px",
        height: "42px",
        borderRadius: "12px",
        background: "#1b1b1b",
        color: "#bdbdbd",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
    },

    settingContent: {
        flex: 1,
        minWidth: 0,
    },

    settingTitle: {
        margin: 0,
        fontSize: "15px",
        fontWeight: "650",
        color: "#f5f5f5",
    },

    settingDescription: {
        margin: "4px 0 0",
        fontSize: "13px",
        lineHeight: "1.45",
        color: "#8b8b8b",
    },

    divider: {
        height: "1px",
        background: "#242424",
        marginLeft: "77px",
    },

    toggle: {
        position: "relative",
        width: "48px",
        height: "27px",
        borderRadius: "20px",
        border: "none",
        background: "#363636",
        padding: 0,
        cursor: "pointer",
        transition: "background 0.2s ease",
        flexShrink: 0,
    },

    toggleActive: {
        background: "#16a34a",
    },

    toggleCircle: {
        position: "absolute",
        width: "21px",
        height: "21px",
        borderRadius: "50%",
        background: "#ffffff",
        top: "3px",
        left: "3px",
        transition: "transform 0.2s ease",
        boxShadow: "0 1px 4px rgba(0,0,0,0.5)",
    },

    toggleCircleActive: {
        transform: "translateX(21px)",
    },

    enabledBadge: {
        background: "#173523",
        color: "#4ade80",
        padding: "6px 10px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: "700",
        flexShrink: 0,
    },

    sessionRow: {
        display: "flex",
        alignItems: "center",
        gap: "15px",
        padding: "20px",
    },

    deviceIcon: {
        width: "42px",
        height: "42px",
        borderRadius: "12px",
        background: "#1b1b1b",
        color: "#bdbdbd",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
    },

    currentBadge: {
        display: "inline-block",
        marginTop: "8px",
        fontSize: "11px",
        fontWeight: "700",
        color: "#4ade80",
        background: "#173523",
        padding: "4px 8px",
        borderRadius: "12px",
    },

    actionRow: {
        width: "100%",
        border: "none",
        background: "#111111",
        display: "flex",
        alignItems: "center",
        gap: "15px",
        padding: "20px",
        textAlign: "left",
        cursor: "pointer",
    },

    actionIcon: {
        width: "42px",
        height: "42px",
        borderRadius: "12px",
        background: "#1b1b1b",
        color: "#bdbdbd",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
    },

    chevron: {
        color: "#666666",
        flexShrink: 0,
    },

    activityCard: {
        background: "#111111",
        border: "1px solid #262626",
        borderRadius: "17px",
        padding: "20px",
    },

    activityItem: {
        display: "flex",
        gap: "14px",
        paddingBottom: "19px",
        marginBottom: "19px",
        borderBottom: "1px solid #242424",
    },

    activityItemLast: {
        borderBottom: "none",
        paddingBottom: 0,
        marginBottom: 0,
    },

    activityDot: {
        width: "9px",
        height: "9px",
        borderRadius: "50%",
        background: "#22c55e",
        marginTop: "5px",
        flexShrink: 0,
    },

    activityTitle: {
        margin: 0,
        fontSize: "14px",
        fontWeight: "650",
        color: "#f5f5f5",
    },

    activityText: {
        margin: "4px 0 0",
        fontSize: "13px",
        color: "#8b8b8b",
    },

    dangerSection: {
        marginTop: "40px",
    },

    dangerTitle: {
        margin: "0 0 12px 3px",
        fontSize: "16px",
        fontWeight: "700",
        color: "#f87171",
    },

    dangerCard: {
        background: "#160d0d",
        border: "1px solid #3a1b1b",
        borderRadius: "17px",
        overflow: "hidden",
    },

    dangerRow: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "20px",
        padding: "20px",
    },

    dangerContent: {
        flex: 1,
    },

    dangerActionTitle: {
        margin: 0,
        fontSize: "15px",
        fontWeight: "650",
        color: "#fca5a5",
    },

    dangerDescription: {
        margin: "4px 0 0",
        fontSize: "13px",
        color: "#a88b8b",
        lineHeight: "1.45",
    },

    deactivateButton: {
        border: "1px solid #b91c1c",
        background: "#1a0d0d",
        color: "#f87171",
        padding: "10px 16px",
        borderRadius: "10px",
        fontSize: "13px",
        fontWeight: "650",
        cursor: "pointer",
        flexShrink: 0,
    },
};

export default ManageAccountProtection;