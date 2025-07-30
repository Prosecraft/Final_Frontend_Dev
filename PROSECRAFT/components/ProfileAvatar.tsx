import { Camera } from 'lucide-react-native';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../hooks/useTheme';

interface ProfileAvatarProps {
  source: any;
  size?: number;
  showEditButton?: boolean;
  onEditPress?: () => void;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  source,
  size = 80,
  showEditButton = false,
  onEditPress
}) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Image 
        source={source} 
        style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]} 
        resizeMode="cover"
      />
      {showEditButton && (
        <TouchableOpacity 
          style={[styles.editButton, { backgroundColor: colors.primary }]} 
          onPress={onEditPress}
        >
          <Camera size={16} color={colors.background} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  avatar: {
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderRadius: 12,
    padding: 4,
  },
});

export default ProfileAvatar; 