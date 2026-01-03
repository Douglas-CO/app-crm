import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export const CustomConfirmDialogStyles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    dialogContainer: {
        width: width * 0.85,
        maxWidth: 400,
        backgroundColor: "white",
        borderRadius: 12,
        paddingVertical: 24,
        paddingHorizontal: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 10,
    },
    titleText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#212121",
        marginBottom: 12,
    },
    subtitleText: {
        fontSize: 16,
        color: "#424242",
        lineHeight: 22,
        marginBottom: 16,
    },
    inputsContainer: {
        marginTop: 10,
        marginBottom: 16,
    },
    actionsContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 12,
        marginTop: 12,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 6,
        minWidth: 90,
        alignItems: "center",
    },
    cancelButton: {
        backgroundColor: "#e0e0e0",
    },
    confirmButton: {
        backgroundColor: "#1976d2",
    },
    cancelButtonText: {
        color: "#424242",
        fontWeight: "600",
        textTransform: "uppercase",
    },
    confirmButtonText: {
        color: "white",
        fontWeight: "600",
        textTransform: "uppercase",
    },
});