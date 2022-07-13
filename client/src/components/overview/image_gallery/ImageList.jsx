import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ListContainer = styled('div')`
  position: absolute;
  display: flex;
  bottom: 15px;
`;

const ThumbnailContainer = styled('div')`
  height: 55px;
  width: 55px;
  margin: 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(0, 0, 0, 0);
`;

const ThumbnailContainerHighlight = styled(ThumbnailContainer)`
  cursor: default;
  border: 2px solid red;
`;

const ImgThumbnail = styled('img')`
  cursor: pointer;
  height: 100%;
  width: 100%;
  object-fit: cover;
  z-index: 1;
`;

const EmptyArrowContainer = styled('div')`
  height: 55px;
  width: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ArrowContainer = styled('div')`
  cursor: pointer;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  z-index: 1;
  border-radius: 5px;
`;

const Arrow = styled('span')`
  user-select: none;
  z-index: 2;
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48;
`;

const ErrorCross = styled('span')`
  user-select: none;
  color: gray;
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48;
  cursor: pointer;
`;

function ImageList({
  photos, currentImgIndex, setCurrentImgIndex,
  minIndexInList, maxIndexInList, shiftList,
}) {
  const renderLeftButton = minIndexInList > 0;
  const renderRightButton = maxIndexInList < photos.length - 1;
  const renderButtonContainers = renderLeftButton || renderRightButton;
  return (
    <ListContainer>
      {
        renderButtonContainers && (
          // the empty arrow containers ensures that the list always stays centered
          // eg. only one arrow is showing, but both empty containers still exist
          <EmptyArrowContainer>
            {renderLeftButton && (
              <ArrowContainer
                onClick={() => { shiftList('left'); }}
              >
                <Arrow className="material-symbols-outlined">
                  chevron_left
                </Arrow>
              </ArrowContainer>
            )}
          </EmptyArrowContainer>
        )
      }
      {photos.map((photo, index) => {
        if (index < minIndexInList || index > maxIndexInList) {
          return undefined;
        }
        const onClick = () => { setCurrentImgIndex(index); };
        const content = photo.thumbnail_url === null
          ? <ErrorCross className="material-symbols-outlined" onClick={onClick}>close</ErrorCross>
          : <ImgThumbnail draggable="false" onClick={onClick} src={photo.thumbnail_url} />;

        if (index === currentImgIndex) {
          return (
            <ThumbnailContainerHighlight>
              {content}
            </ThumbnailContainerHighlight>
          );
        }
        return (
          <ThumbnailContainer>
            {content}
          </ThumbnailContainer>
        );
      })}
      {
        renderButtonContainers && (
          <EmptyArrowContainer>
            {renderRightButton && (
              <ArrowContainer
                onClick={() => { shiftList('right'); }}
              >
                <Arrow className="material-symbols-outlined">
                  chevron_right
                </Arrow>
              </ArrowContainer>
            )}
          </EmptyArrowContainer>
        )
      }
    </ListContainer>
  );
}

ImageList.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.shape({
    thumbnail_url: PropTypes.string,
    url: PropTypes.string,
  })).isRequired,
  currentImgIndex: PropTypes.number.isRequired,
  setCurrentImgIndex: PropTypes.func.isRequired,
  minIndexInList: PropTypes.number.isRequired,
  maxIndexInList: PropTypes.number.isRequired,
  shiftList: PropTypes.func.isRequired,
};

export default ImageList;
