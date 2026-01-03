import { usePaletteStore } from "@/store/usePaletteStore";
import { StyleSheet } from "react-native";

export const CardStyle = () => {
  const { selectedPalette } = usePaletteStore();
  return StyleSheet.create({
  card: {
    overflow: "hidden",
    width: "100%",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8
  },
  description: {
    fontSize: 16,
    color: "gray",
    marginBottom: 16,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    backgroundColor: "#2196F3",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  childrenContainer: {
    marginBottom: 16,
  },
  body: {
    marginVertical: 12,
  },
});
};
