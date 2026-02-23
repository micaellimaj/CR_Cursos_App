import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';

interface Styles {
  container: ViewStyle;
  headerGradient: ViewStyle;
  headerContent: ViewStyle;
  logo: ImageStyle;
  headerTitle: TextStyle;
  section: ViewStyle;
  sectionTitle: TextStyle;
  drawerItem: ViewStyle;
  drawerLabel: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
  },
  headerGradient: {
    padding: 16,
    marginBottom: 8,
  },
  headerContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  section: {
    marginTop: 8,
    paddingHorizontal: 8,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 16,
    marginVertical: 8,
    letterSpacing: 1,
  },
  drawerItem: {
    borderRadius: 8,
    marginHorizontal: 4,
    marginVertical: 2,
  },
  drawerLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default styles;