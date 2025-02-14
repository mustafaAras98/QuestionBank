import {TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './DeleteItemButton.style';
import Reanimated from 'react-native-reanimated';
import albumService from '../../Services/Album.Service';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

const DeleteItemButton = ({reFetch, userId, albumId, imageId}) => {
  return (
    <Reanimated.View style={styles.DeleteItemContainer}>
      <TouchableOpacity
        onPress={async () => {
          await albumService.deleteImage(userId, albumId, imageId);
          await reFetch();
        }}
        style={styles.DeleteItemButtonContainer}>
        <FontAwesome6
          size={25}
          style={styles.DeleteItemIcon}
          name="trash"
          iconStyle={'solid'}
        />
      </TouchableOpacity>
    </Reanimated.View>
  );
};

export default React.memo(DeleteItemButton);
