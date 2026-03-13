import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ComponentProps } from 'react';

type FeatherIconName = ComponentProps<typeof Feather>['name'];

interface ProfileInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  iconName: FeatherIconName;
  colors: any;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

export const ProfileInput: React.FC<ProfileInputProps> = ({
  label, value, onChangeText, iconName, colors, 
  secureTextEntry = false, keyboardType = 'default', autoCapitalize = 'sentences'
}) => (
  <View style={{ marginBottom: 15 }}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ flex: 1 }}>
        <Text style={{ color: colors.subText, fontSize: 12 }}>{label}</Text>
        <TextInput
          style={{ 
            color: colors.mainText, 
            fontSize: 16, 
            borderBottomWidth: 1, 
            borderColor: colors.divider,
            paddingVertical: 4,
            marginTop: 4
          }}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
        />
      </View>
      <Feather name={iconName} size={18} color={colors.iconColor} style={{ marginLeft: 10, marginTop: 15 }} />
    </View>
  </View>
);