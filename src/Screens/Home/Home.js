import {View, FlatList, TouchableWithoutFeedback} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import BackgroundContainer from '../../Components/BackgroundContainerComponent';
import {styles} from './Home.style';
import {useSelector} from 'react-redux';
import albumService from '../../Services/Album.Service';
import AlbumCard from '../../Components/AlbumCard';
import {Enums} from '../../Constants/Enums';

const Home = () => {
  const user = useSelector(state => state.user);

  const flatlistRef = useRef(null);
  const cardRef = useRef(null);

  const [albumDatas, setAlbumDatas] = useState([]);
  const [paddedData, setPaddedData] = useState([]);
  const [activeCardId, setActiveCardId] = useState(null);

  const handlePressOutside = () => {
    setActiveCardId(null);
  };

  const fetchAlbumDatas = useCallback(async () => {
    if (!user.info.uid) {
      return;
    }
    try {
      const datas = await albumService.fetchAlbumsByUserId(user.info.uid);
      setAlbumDatas(datas);
    } catch (error) {
      console.error('Album titles fetch error:', error);
    }
  }, [user.info.uid]);

  useEffect(() => {
    fetchAlbumDatas();
  }, [fetchAlbumDatas]);

  useEffect(() => {
    if (!user.info.uid) {
      return;
    }

    let updatedData = [];

    if (
      !albumDatas ||
      albumDatas.length === 0 ||
      albumDatas === Enums.MESSAGE.Errors.AlbumsDontExists
    ) {
      updatedData = [{Uid: 'placeholder-1', isPlaceholder: true}];
    } else {
      updatedData = albumDatas.filter(item => Object.keys(item).length > 0);
      updatedData.push({
        Uid: `placeholder-${updatedData.length + 1}`,
        isPlaceholder: true,
      });
    }
    setPaddedData(updatedData);
  }, [albumDatas, user.info.uid]);

  const handleScrollToIndex = index => {
    if (flatlistRef.current) {
      flatlistRef.current.scrollToIndex({
        index: Math.max(0, Math.floor(index / 2)),
        animated: true,
      });
    }
  };

  const handleLongPressOnAlbum = useCallback(Uid => {
    setActiveCardId(prevId => (prevId === Uid ? null : Uid));
  }, []);

  const reFetchAlbums = useCallback(() => {
    fetchAlbumDatas();
    setActiveCardId(null);
  }, [fetchAlbumDatas]);

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
          isFlipped={activeCardId === item.Uid}
          whichLastRow={whichRow}
          handleLongPressOnAlbum={() => {
            handleLongPressOnAlbum(item.Uid);
            handleScrollToIndex(index);
          }}
          reFetchAlbums={reFetchAlbums}
        />
      );
    },
    [activeCardId, paddedData, handleLongPressOnAlbum, reFetchAlbums],
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
                keyExtractor={item => item.Uid}
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
