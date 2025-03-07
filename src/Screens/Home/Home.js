import {
  View,
  FlatList,
  TouchableWithoutFeedback,
  RefreshControl,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import BackgroundContainer from '../../Components/BackgroundContainerComponent';
import {createStyles} from './Home.style';
import {useSelector} from 'react-redux';
import albumService from '../../Services/Album.Service';
import AlbumCard from '../../Components/AlbumCard';
import {Enums} from '../../Constants/Enums';
import {useFocusEffect} from '@react-navigation/native';
import Header from '../../Components/Header/Header';

const Home = () => {
  const user = useSelector(state => state.user);
  const userId = user.info?.uid;

  const theme = useSelector(state => state.theme.theme);
  let styles = useMemo(() => createStyles(theme), [theme]);

  const flatlistRef = useRef(null);
  const cardRef = useRef(null);

  const [albumDatas, setAlbumDatas] = useState([]);
  const [paddedData, setPaddedData] = useState([]);
  const [activeCardId, setActiveCardId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      return () => {
        handlePressOutside();
      };
    }, [handlePressOutside]),
  );

  const fetchAlbumDatas = useCallback(async () => {
    if (!userId) {
      return;
    }

    try {
      const datas = await albumService.fetchAlbumsByUserId(userId);
      setAlbumDatas(datas);
    } catch (error) {
      console.error('Album titles fetch error:', error);
    }
  }, [userId]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchAlbumDatas();
    setRefreshing(false);
  }, [fetchAlbumDatas]);

  const handlePressOutside = useCallback(() => {
    setActiveCardId(null);
  }, []);

  const handleLongPressOnAlbum = useCallback(uid => {
    setActiveCardId(prevId => (prevId === uid ? null : uid));
  }, []);

  const handleScrollToIndex = useCallback(index => {
    if (flatlistRef.current) {
      flatlistRef.current.scrollToIndex({
        index: Math.max(0, Math.floor(index / 2)),
        animated: true,
      });
    }
  }, []);

  const reFetchAlbums = useCallback(() => {
    fetchAlbumDatas();
    setActiveCardId(null);
  }, [fetchAlbumDatas]);

  useEffect(() => {
    fetchAlbumDatas();
  }, [fetchAlbumDatas]);

  useEffect(() => {
    if (!userId) {
      return;
    }

    let updatedData = [];
    const isAlbumsEmpty =
      !albumDatas ||
      albumDatas.length === 0 ||
      albumDatas === Enums.MESSAGE.Errors.AlbumsDontExists;

    if (isAlbumsEmpty) {
      updatedData = [{Uid: 'placeholder-1', isPlaceholder: true}];
    } else {
      updatedData = albumDatas.filter(item => Object.keys(item).length > 0);
      updatedData.push({
        Uid: `placeholder-${updatedData.length + 1}`,
        isPlaceholder: true,
      });
    }

    setPaddedData(updatedData);
  }, [albumDatas, userId]);

  const getRowPosition = useCallback((index, totalItems) => {
    const rowNumber = Math.round(totalItems / 2);
    const indexRowNumber = Math.floor(index / 2) + 1;

    if (totalItems > 4) {
      const positionFromEnd = rowNumber - indexRowNumber;

      if (positionFromEnd === 0) {
        return Enums.FLATLISTROW.Last;
      }
      if (positionFromEnd === 1) {
        return Enums.FLATLISTROW.SecondToLast;
      }
      return Enums.FLATLISTROW.Other;
    } else {
      if (indexRowNumber === 1) {
        return Enums.FLATLISTROW.Other;
      }
      if (indexRowNumber === 2) {
        return Enums.FLATLISTROW.SecondToLast;
      }
      return Enums.FLATLISTROW.Last;
    }
  }, []);

  const renderItem = useCallback(
    ({item, index}) => {
      const whichRow = getRowPosition(index, paddedData.length);

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
    [
      activeCardId,
      paddedData,
      handleLongPressOnAlbum,
      handleScrollToIndex,
      reFetchAlbums,
      getRowPosition,
    ],
  );

  return (
    <BackgroundContainer>
      <TouchableWithoutFeedback
        onLongPress={handlePressOutside}
        onPress={handlePressOutside}>
        <View style={styles.Container}>
          <View style={styles.HeaderContainer}>
            <Header />
          </View>
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
                onScrollBeginDrag={handlePressOutside}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                  />
                }
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </BackgroundContainer>
  );
};

export default React.memo(Home);
