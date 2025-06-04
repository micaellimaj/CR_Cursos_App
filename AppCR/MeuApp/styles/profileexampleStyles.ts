import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
},
  header: {
    backgroundColor: '#2563eb', // Azul escuro
    padding: 20,
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#2563eb', // Azul escuro
    borderRadius: 15,
    padding: 5,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff', // Branco para ambos os temas
    marginTop: 10,
  },
  info: {
    fontSize: 14,
    color: '#fff', // Branco claro para ambos os temas
    marginTop: 2,
  },
  userCourse: {
    fontSize: 14,
    color: '#fff', // Branco claro para ambos os temas
    marginTop: 10,
    fontStyle: 'italic',
  },
  card: {
    backgroundColor: '#f5f7fa',
    margin: 20,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 10,
  },
  cardContent: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2563eb',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    flex: 1,
  },
  value: {
    fontSize: 16,
    flex: 2,
  },
  editButton: {
    padding: 5,
  },
  buttonsContainer: {
    marginHorizontal: 20,
  },
  updateButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
    marginBottom: 16,
    fontSize: 16,
    color: '#0f172a',
    backgroundColor: '#fff',
  },
  
});

export default styles;