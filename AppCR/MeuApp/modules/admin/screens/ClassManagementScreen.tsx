import React, { useState } from 'react';
import { 
  View, Text, FlatList, TouchableOpacity, TextInput, 
  Modal, ScrollView, KeyboardAvoidingView, Platform 
} from 'react-native';
import { MaterialIcons, Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '../../../contexts/ThemeContext';
import { getGlobalStyles } from '../../../styles/globalStyles';
import CustomButton from '../../../components/CustomButton';
import styles from '../styles/ClassManagementStyles';

export default function ClassManagementScreen() {
  const { theme } = useTheme();
  const globalStyles = getGlobalStyles(theme);
  const isLightTheme = theme === 'light';

  const [classes, setClasses] = useState([
    { 
      id: '1', 
      name: 'CS Morning Class A', 
      course: 'Computer Science', 
      schedule: 'Mon/Wed/Fri 9:00 AM', 
      room: 'Room 201',
      teacher: 'Prof. Sarah Johnson',
      studentsCount: 12
    }
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedClass, setSelectedClass] = useState<any>(null);

  const labelColor = isLightTheme ? '#475569' : '#cbd5e1';
  const inputBg = isLightTheme ? '#f8fafc' : '#1e293b';

  return (
    <View style={[globalStyles.container, styles.container]}>
      <View style={styles.content}>
        <View style={styles.headerSection}>
          <Text style={[styles.title, { color: isLightTheme ? '#1e3a8a' : '#fff' }]}>Class Management</Text>
          <Text style={styles.subtitle}>Create classes, enroll students, and assign teachers</Text>
        </View>

        <CustomButton title="+ New Class" onPress={() => { setSelectedClass(null); setModalVisible(true); }} />

        <View style={[styles.searchBar, { backgroundColor: inputBg }]}>
          <Feather name="search" size={20} color="#94a3b8" />
          <TextInput placeholder="Search classes..." style={[styles.searchInput, { color: isLightTheme ? '#000' : '#fff' }]} placeholderTextColor="#94a3b8" />
        </View>

        <FlatList
          data={classes}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={[styles.classCard, { backgroundColor: isLightTheme ? '#fff' : '#1e293b' }]}>
              <View style={styles.classHeader}>
                <View style={styles.iconContainer}>
                  <FontAwesome5 name="users" size={18} color="#2563eb" />
                </View>
                <View style={styles.classMainInfo}>
                  <Text style={[styles.className, { color: isLightTheme ? '#1e293b' : '#fff' }]}>{item.name}</Text>
                  <Text style={styles.classSubDetails}>{item.course}  •  {item.schedule}  •  {item.room}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity onPress={() => { setSelectedClass(item); setModalVisible(true); }}>
                    <Feather name="edit-2" size={18} color="#2563eb" style={{ marginRight: 15 }} />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Feather name="trash-2" size={18} color="#ef4444" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Tags de Informação da Imagem */}
              <View style={styles.tagRow}>
                <View style={styles.infoTag}>
                   <Feather name="user" size={12} color="#475569" />
                   <Text style={styles.tagText}>{item.teacher}</Text>
                </View>
                <View style={styles.infoTag}>
                   <Feather name="users" size={12} color="#475569" />
                   <Text style={styles.tagText}>{item.studentsCount} students</Text>
                </View>
              </View>

              {/* Botões de Ação da Imagem */}
              <View style={styles.manageButtons}>
                <TouchableOpacity style={styles.actionTextButton}>
                  <Ionicons name="person-add-outline" size={14} color="#1e293b" />
                  <Text style={styles.actionText}>Enroll Student</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionTextButton}>
                  <Ionicons name="git-network-outline" size={14} color="#1e293b" />
                  <Text style={styles.actionText}>Assign Teacher</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>

      {/* MODAL DE EDIÇÃO/CRIAÇÃO */}
      <Modal visible={modalVisible} animationType="slide" transparent={true} statusBarTranslucent>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: isLightTheme ? '#fff' : '#0f172a' }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.title, { fontSize: 18, color: isLightTheme ? '#1e3a8a' : '#fff', flex: 1 }]}>
                {selectedClass ? 'Edit Class' : 'New Class'}
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <MaterialIcons name="close" size={26} color={labelColor} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: labelColor }]}>Course</Text>
                <TouchableOpacity style={[styles.input, { backgroundColor: inputBg, flexDirection: 'row', justifyContent: 'space-between' }]}>
                  <Text style={{ color: isLightTheme ? '#000' : '#fff' }}>{selectedClass?.course || 'Select Course'}</Text>
                  <Feather name="chevron-down" size={20} color={labelColor} />
                </TouchableOpacity>
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: labelColor }]}>Class Name</Text>
                <TextInput 
                  style={[styles.input, { backgroundColor: inputBg, color: isLightTheme ? '#000' : '#fff' }]} 
                  defaultValue={selectedClass?.name} 
                  placeholder="Ex: CS Morning Class A" 
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: labelColor }]}>Schedule</Text>
                <TextInput 
                  style={[styles.input, { backgroundColor: inputBg, color: isLightTheme ? '#000' : '#fff' }]} 
                  defaultValue={selectedClass?.schedule} 
                  placeholder="Ex: Mon/Wed/Fri 9:00 AM" 
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: labelColor }]}>Room</Text>
                <TextInput 
                  style={[styles.input, { backgroundColor: inputBg, color: isLightTheme ? '#000' : '#fff' }]} 
                  defaultValue={selectedClass?.room} 
                  placeholder="Ex: Room 201" 
                />
              </View>

              <TouchableOpacity style={styles.saveButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}