import {View, FlatList, TouchableWithoutFeedback} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import BackgroundContainer from '../../Components/BackgroundContainerComponent';
import {styles} from './Home.style';
import {useSelector} from 'react-redux';
import userService from '../../Services/User.Service';
import AlbumCard from '../../Components/AlbumCard';
import {Enums} from '../../Constants/Enums';

const Home = () => {
  const user = useSelector(state => state.user);
  const flatlistRef = useRef(null);
  const [albumDatas, setAlbumDatas] = useState([]);
  const [paddedData, setPaddedData] = useState([]);

  const [activeCardId, setActiveCardId] = useState(null);

  const cardRef = useRef(null);
  const handlePressOutside = () => {
    setActiveCardId(null);
  };

  useEffect(() => {
    const fetchAlbumTitles = async () => {
      try {
        const titles = await userService.fetchAlbumsByUserId(user.info.uid);
        setAlbumDatas(titles);
      } catch (error) {
        console.error('Album titles fetch error:', error);
      }
    };

    fetchAlbumTitles();
  }, [user.info.uid]);

  useEffect(() => {
    if (!albumDatas || albumDatas.length === 0) {
      return;
    }
    const updatedData = [...albumDatas];
    updatedData.push({
      id: `placeholder-${updatedData.length + 1}`,
      isPlaceholder: true,
    });

    setPaddedData(updatedData);
  }, [albumDatas]);

  const handleScrollToIndex = index => {
    if (flatlistRef.current) {
      flatlistRef.current.scrollToIndex({
        index: Math.floor(index / 2),
        animated: true,
      });
    }
  };
  const handleLongPressOnAlbum = useCallback(id => {
    setActiveCardId(prevId => (prevId === id ? null : id));
  }, []);

  const renderItem = useCallback(
    ({item, index}) => {
      let whichRow = '';
      const rowNumber = Math.round(paddedData.length / 2);
      const indexRowNumber = Math.floor(index / 2) + 1;

      if (paddedData.length > 4) {
        switch (rowNumber - indexRowNumber) {
          case 0:
            whichRow = Enums.FLATLISTROW.Last;
            break;
          case 1:
            whichRow = Enums.FLATLISTROW.SecondToLast;
            break;
          default:
            whichRow = Enums.FLATLISTROW.Other;
            break;
        }
      } else {
        switch (indexRowNumber) {
          case 1:
            whichRow = Enums.FLATLISTROW.Other;
            break;
          case 2:
            whichRow = Enums.FLATLISTROW.SecondToLast;
            break;
          default:
            whichRow = Enums.FLATLISTROW.Last;
            break;
        }
      }
      return (
        <AlbumCard
          albumItem={item}
          index={index}
          albumCardRef={cardRef}
          isPlaceholder={item.isPlaceholder}
          isFlipped={activeCardId === item.id}
          whichLastRow={whichRow}
          handleLongPressOnAlbum={() => {
            handleLongPressOnAlbum(item.id);
            handleScrollToIndex(index);
          }}
        />
      );
    },
    [activeCardId, paddedData, handleLongPressOnAlbum],
  );
  return (
    <BackgroundContainer>
      <TouchableWithoutFeedback
        onLongPress={handlePressOutside}
        onPress={handlePressOutside}>
        <View style={styles.Container}>
          <View style={styles.GlassBackground}>
            <View style={styles.FlatListContainer}>
              <FlatList
                style={styles.Flatlist}
                data={paddedData}
                ref={flatlistRef}
                numColumns={2}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                extraData={activeCardId}
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={styles.ColumnWrapperStyle}
                onScrollBeginDrag={() => {
                  setActiveCardId(null);
                }}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </BackgroundContainer>
  );
};

export default React.memo(Home);
