import React, {forwardRef, useCallback, useEffect, useRef} from 'react';
import {
  View,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';

import {styles} from './AlbumCard.style';
import AlbumCardPlaceholder from './SubComponents/AlbumCardPlaceholder';
import AlbumCardFront from './SubComponents/AlbumCardFront';
import AlbumCardBack from './SubComponents/AlbumCardBack';
import {Enums} from '../../Constants/Enums';

const {width, height} = Dimensions.get('window');
const itemHeight = (Dimensions.get('window').height * 0.7) / 3.2;

const AlbumCard = forwardRef(
  (
    {
      albumItem,
      index,
      isPlaceholder = false,
      isFlipped,
      handleLongPressOnAlbum,
      whichLastRow = Enums.FLATLISTROW.Other,
      reFetchAlbums,
    },
    albumCardRef,
  ) => {
    const flipAnimation = useRef(new Animated.Value(0)).current;
    const positionalAnimation = useRef(
      new Animated.ValueXY({x: 0, y: 0}),
    ).current;
    const scaleAnimation = useRef(new Animated.Value(1)).current;

    const frontInterpolate = flipAnimation.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    });
    const backInterpolate = flipAnimation.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg'],
    });
    const startAnimation = useCallback(() => {
      const columnNum = index % 2;

      Animated.parallel([
        Animated.spring(flipAnimation, {
          toValue: isFlipped ? 180 : 0,
          friction: 8,
          tension: 10,
          useNativeDriver: true,
        }),
        Animated.spring(positionalAnimation, {
          toValue: isFlipped
            ? {
                x: columnNum === 1 ? -(width / 4.75) : width / 4.75,
                y:
                  whichLastRow === Enums.FLATLISTROW.Last
                    ? height / 4.75 - 2 * itemHeight - 16
                    : whichLastRow === Enums.FLATLISTROW.SecondToLast
                    ? height / 4.75 - itemHeight - 8
                    : height / 4.75,
              }
            : {x: 0, y: 0},
          friction: 8,
          tension: 10,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnimation, {
          toValue: isFlipped ? 2 : 1,
          friction: 8,
          tension: 10,
          useNativeDriver: true,
        }),
      ]).start();
    }, [
      flipAnimation,
      positionalAnimation,
      scaleAnimation,
      index,
      isFlipped,
      whichLastRow,
    ]);
    useEffect(() => {
      startAnimation();
    }, [isFlipped, startAnimation]);

    return (
      <Animated.View
        ref={albumCardRef}
        style={[
          styles.Container,
          {
            transform: [
              {translateX: positionalAnimation.x},
              {translateY: positionalAnimation.y},
              {scale: scaleAnimation},
            ],
          },
          isFlipped ? styles.ActiveCard : styles.InactiveCard,
          {height: itemHeight},
        ]}>
        {isPlaceholder ? (
          <AlbumCardPlaceholder reFetchAlbums={reFetchAlbums} />
        ) : (
          <TouchableWithoutFeedback
            onLongPress={() => {
              startAnimation();
              handleLongPressOnAlbum();
            }}>
            <View style={styles.CardContainer}>
              <Animated.View
                style={[
                  styles.CardFront,
                  {
                    transform: [{rotateY: frontInterpolate}],
                  },
                  isFlipped ? styles.InactiveCard : styles.ActiveCard,
                ]}>
                <AlbumCardFront
                  onLongPress={handleLongPressOnAlbum}
                  albumTitle={albumItem.Title}
                  albumImageUri={albumItem.ImageURL}
                  albumUid={albumItem.Uid}
                />
              </Animated.View>
              <Animated.View
                style={[
                  styles.CardBack,
                  {
                    transform: [{rotateY: backInterpolate}],
                  },
                  isFlipped ? styles.ActiveCard : styles.InactiveCard,
                ]}>
                <AlbumCardBack
                  isFlipped={isFlipped}
                  albumItem={albumItem}
                  onLongPress={handleLongPressOnAlbum}
                  reFetchAlbums={reFetchAlbums}
                />
              </Animated.View>
            </View>
          </TouchableWithoutFeedback>
        )}
      </Animated.View>
    );
  },
);

export default React.memo(AlbumCard, (prevProps, nextProps) => {
  return (
    prevProps.isFlipped === nextProps.isFlipped &&
    prevProps.albumItem.id === nextProps.albumItem.id &&
    prevProps.albumItem.Title === nextProps.albumItem.Title
  );
});
