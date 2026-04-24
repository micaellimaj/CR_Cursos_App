import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  content: { 
    flex: 1, 
    paddingHorizontal: 16, 
    paddingTop: 15,
    width: '100%',
  },
  headerSection: { 
    width: '100%', 
    marginBottom: 20,
    paddingHorizontal: 4
  },
  title: { 
    fontSize: 24, 
    fontWeight: '800', 
    letterSpacing: -0.5
  },
  subtitle: { 
    fontSize: 13, 
    color: '#64748b',
    marginTop: 2 
  },
  card: {
    borderRadius: 16,
    padding: 18,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: { 
    flex: 1, 
    marginLeft: 14
  },
  mainName: { 
    fontSize: 16, 
    fontWeight: '700', 
    marginBottom: 2,
  },
  subInfo: { 
    fontSize: 12, 
    color: '#64748b',
    fontWeight: '500' 
  },
  emptyContainer: { 
    alignItems: 'center', 
    justifyContent: 'center',
    marginTop: 80,
  },
  emptyText: { 
    marginTop: 10, 
    color: '#94a3b8', 
    fontSize: 14,
  }
});