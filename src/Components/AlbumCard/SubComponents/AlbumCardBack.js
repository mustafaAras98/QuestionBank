import {View, TouchableOpacity} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';

import {styles} from '../AlbumCard.style';
import TextInputComp from '../../TextInputComp';
import {Enums} from '../../../Constants/Enums';
import ButtonComp from '../../ButtonComp';

const AlbumCardBack = ({onLongPress}) => {
  const [title, setTitle] = useState('');
  const titleRef = useRef(title);

  const handleTitleChange = useCallback(value => {
    titleRef.current = value;
    setTitle(value);
  }, []);

  const handleDeleteButtonPress = () => {
    //console.log('Delete button implement edilecek');
  };
  return (
    <TouchableOpacity
      onLongPress={onLongPress}
      onPress={() => {
        /* console.log('Go To Album Page!'); */
      }}
      style={styles.InnerContainer}>
      <View style={styles.AlbumCardBackContainer}>
        <View style={styles.AlbumCardBackItemContainer}>
          <TextInputComp
            fontSizeParam={10}
            label="Edit Title"
            theme={Enums.TEXTINPUT_TYPES.Primary}
            rightLogoName="pen"
            placeholder="New Title"
            value={title}
            onChangeValue={handleTitleChange}
            rightLogoOnPress={() => {
              console.log(title);
            }}
          />
        </View>
        <View style={styles.AlbumCardBackItemContainer}>
          <ButtonComp
            theme={Enums.BUTTON_TYPES.Delete}
            buttonText="Delete"
            onPress={handleDeleteButtonPress}
            rightLogoName="trash-can"
            contentSize={16}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(AlbumCardBack);
