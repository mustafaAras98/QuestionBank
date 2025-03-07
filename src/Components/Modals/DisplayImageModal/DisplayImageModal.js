import {View, Text, Modal, Image, TouchableOpacity} from 'react-native';
import React, { useMemo } from 'react';

import {createStyles} from './DisplayImageModal.style';
import {useSelector} from 'react-redux';

const DisplayImageModal = ({
  isModalVisible,
  setSelectedImage,
  imageUrl,
  title,
}) => {
  const theme = useSelector(state => state.theme.theme);
  let styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => setSelectedImage(null)}>
      <View style={styles.CenteredView}>
        <View style={styles.ModalView}>
          <TouchableOpacity
            style={styles.CloseButton}
            onPress={() => setSelectedImage(null)}>
            <Text adjustsFontSizeToFit style={styles.CloseText}>
              X
            </Text>
          </TouchableOpacity>
          <View style={styles.Header}>
            <Text adjustsFontSizeToFit style={styles.Title}>
              {title}
            </Text>
          </View>
          {imageUrl && (
            <View style={styles.ImageContainer}>
              <Image style={styles.ImageComp} source={{uri: imageUrl}} />
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default React.memo(DisplayImageModal);
