import React, {useMemo} from 'react';
import {TouchableOpacity} from 'react-native';

import {useSelector} from 'react-redux';
import albumService from '../../Services/Album.Service';

import Reanimated from 'react-native-reanimated';
import {createStyles} from './DeleteItemButton.style';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import {useTranslation} from 'react-i18next';

const DeleteItemButton = ({reFetch, userId, albumId, imageId}) => {
  const {t} = useTranslation();
  const theme = useSelector(state => state.theme.theme);
  let styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <Reanimated.View style={styles.DeleteItemContainer}>
      <TouchableOpacity
        onPress={async () => {
          await albumService.deleteImage(userId, albumId, imageId, t);
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
