import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  button: {
    width: width * 0.8,
    backgroundColor: "rgb(58, 155, 92)",
    padding: 10,
    margin: 10,
    borderRadius: 20,
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 60,
    paddingBottom: 40,
    backgroundColor: "rgb(24, 73, 88)",
  },
  editableListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginVertical: 4,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    marginTop: 5,
  }, 
  editableListIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 70,
  }, 
  icon: {
    marginLeft: 10,
  },
  iconButton: {
    marginLeft: 10,
  },
  iconColumn: {
    flexDirection: 'column', // Altera a direção dos ícones para coluna
    justifyContent: 'center', // Centraliza na coluna
  },  
  input: {
    width: width * 0.8,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
    paddingLeft: 10,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    marginVertical: 5,
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
    marginVertical: 5, 
  },
  item: {
    flex: 1,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  itemTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  listContainer: {
    flex: 1,
    width: width * 0.8,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: width * 0.8,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    margin: 10,
    backgroundColor: "#FFFFFF",
  },
  passwordInput: {
    flex: 1,
    height: 40,
  },
  picker: {
    width: width * 0.8,
    height: 40,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  pickerContainer: {
    height: 45,
    margin: 10,
    borderRadius: 20,
    overflow: 'hidden',
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: width * 0.8,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    margin: 10,
    height: 40,
    backgroundColor: "#FFFFFF",
    color: "black",
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: "black",
  },
  selectedItem: {
    backgroundColor: "lightblue",
  },  
  separator: {
    height: 1,
    backgroundColor: 'black',
    marginVertical: 0,
  },
  title: {
    fontSize: 24,
    marginTop: 10,
    marginBottom: 5,
    color: "#FFFFFF",
  },
  trashIcon: {
    color: "red",
  },
});

export default styles;
