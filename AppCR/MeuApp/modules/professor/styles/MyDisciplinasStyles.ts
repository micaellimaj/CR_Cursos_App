import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  // Ajustado para preencher melhor as laterais
  content: { 
    flex: 1, 
    paddingHorizontal: 16, // Padding equilibrado
    paddingTop: 15 ,
    width: '95%',
  },
  
  headerSection: { 
    width: '100%', 
    marginBottom: 20,
    paddingHorizontal: 4 // Pequeno ajuste para alinhar com os cards
  },
  
  title: { 
    fontSize: 24, 
    fontWeight: '800', // Mais peso visual
    letterSpacing: -0.5
  },
  
  subtitle: { 
    fontSize: 13, 
    color: '#64748b',
    marginTop: 2 
  },
  
  subjectCard: {
    borderRadius: 16, // Bordas mais modernas
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%', // Força o uso de toda a largura disponível
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
    width: 46,
    height: 46,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  subjectInfo: { 
    flex: 1, 
    marginLeft: 14
  },
  
  subjectName: { 
    fontSize: 16, 
    fontWeight: '700', 
    marginBottom: 2,
    lineHeight: 22
  },
  
  courseTag: { 
    fontSize: 12, 
    color: '#64748b',
    fontWeight: '500' 
  },
  
  tagRow: { 
    flexDirection: 'row', 
    marginTop: 6
  },
  
  infoTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  
  tagText: { 
    fontSize: 11, 
    marginLeft: 4, 
    fontWeight: 'bold' 
  },
  
  flatListContent: {
    paddingBottom: 30,
    width: '100%'
  },
  
  emptyContainer: { 
    alignItems: 'center', 
    justifyContent: 'center',
    marginTop: 80,
    paddingHorizontal: 40
  },
  
  emptyText: { 
    marginTop: 10, 
    color: '#94a3b8', 
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 22
  }
});