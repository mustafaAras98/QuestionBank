import {View, Text, Modal, Image, TouchableOpacity} from 'react-native';
import React from 'react';

import {styles} from './DisplayImageModal.style';

const DisplayImageModal = ({
  isModalVisible,
  setSelectedImage,
  imageUrl,
  title,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={setSelectedImage}>
      <View style={styles.CenteredView}>
        <View style={styles.ModalView}>
          <TouchableOpacity
            style={styles.CloseButton}
            onPress={setSelectedImage}>
            <Text style={styles.CloseText}>X</Text>
          </TouchableOpacity>
          <View style={styles.Header}>
            <Text style={styles.Title}>{title}</Text>
          </View>
          {!imageUrl ||
            (imageUrl !== null && (
              <View style={styles.ImageContainer}>
                <Image style={styles.ImageComp} source={{uri: imageUrl}} />
              </View>
            ))}
        </View>
      </View>
    </Modal>
  );
};

export default React.memo(DisplayImageModal);
