import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { icons } from 'Helpers/Props';
import IconButton from 'Components/Link/IconButton';
import Label from 'Components/Label';
import Link from 'Components/Link/Link';
import MoviePoster from 'Movie/MoviePoster';
import AddNewMovieModal from 'AddMovie/AddNewMovie/AddNewMovieModal';
import ExcludeMovieModal from 'AddMovie/AddListMovie/Exclusion/ExcludeMovieModal';
import styles from './AddListMoviePoster.css';

class AddListMoviePoster extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      hasPosterError: false,
      isNewAddMovieModalOpen: false,
      isExcludeMovieModalOpen: false
    };
  }

  //
  // Listeners

  onPress = () => {
    this.setState({ isNewAddMovieModalOpen: true });
  }

  onAddMovieModalClose = () => {
    this.setState({ isNewAddMovieModalOpen: false });
  }

  onExcludeMoviePress = () => {
    this.setState({ isExcludeMovieModalOpen: true });
  }

  onExcludeMovieModalClose = () => {
    this.setState({ isExcludeMovieModalOpen: false });
  }

  onPosterLoad = () => {
    if (this.state.hasPosterError) {
      this.setState({ hasPosterError: false });
    }
  }

  onPosterLoadError = () => {
    if (!this.state.hasPosterError) {
      this.setState({ hasPosterError: true });
    }
  }

  //
  // Render

  render() {
    const {
      tmdbId,
      title,
      year,
      overview,
      folder,
      titleSlug,
      images,
      posterWidth,
      posterHeight,
      showTitle,
      isExistingMovie,
      isExclusionMovie
    } = this.props;

    const {
      hasPosterError,
      isNewAddMovieModalOpen,
      isExcludeMovieModalOpen
    } = this.state;

    const linkProps = isExistingMovie ? { to: `/movie/${titleSlug}` } : { onPress: this.onPress };

    const elementStyle = {
      width: `${posterWidth}px`,
      height: `${posterHeight}px`
    };

    return (
      <div className={styles.content}>
        <div className={styles.posterContainer}>
          {
            isExclusionMovie &&
              <div
                className={styles.excluded}
                title="Exluded"
              />
          }

          <Label className={styles.controls}>
            <IconButton
              className={styles.action}
              name={icons.REMOVE}
              title={isExclusionMovie ? 'Movie already Excluded' : 'Exclude Movie'}
              onPress={this.onExcludeMoviePress}
              isDisabled={isExclusionMovie}
            />
          </Label>

          <Link
            className={styles.link}
            style={elementStyle}
            {...linkProps}
          >
            <MoviePoster
              className={styles.poster}
              style={elementStyle}
              images={images}
              size={250}
              lazy={false}
              overflow={true}
              onError={this.onPosterLoadError}
              onLoad={this.onPosterLoad}
            />

            {
              hasPosterError &&
                <div className={styles.overlayTitle}>
                  {title}
                </div>
            }
          </Link>
        </div>

        {
          showTitle &&
            <div className={styles.title}>
              {title}
            </div>
        }

        <AddNewMovieModal
          isOpen={isNewAddMovieModalOpen && !isExistingMovie}
          tmdbId={tmdbId}
          title={title}
          year={year}
          overview={overview}
          folder={folder}
          images={images}
          onModalClose={this.onAddMovieModalClose}
        />

        <ExcludeMovieModal
          isOpen={isExcludeMovieModalOpen}
          tmdbId={tmdbId}
          title={title}
          year={year}
          onModalClose={this.onExcludeMovieModalClose}
        />
      </div>
    );
  }
}

AddListMoviePoster.propTypes = {
  tmdbId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  overview: PropTypes.string.isRequired,
  folder: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  titleSlug: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  posterWidth: PropTypes.number.isRequired,
  posterHeight: PropTypes.number.isRequired,
  showTitle: PropTypes.bool.isRequired,
  showRelativeDates: PropTypes.bool.isRequired,
  shortDateFormat: PropTypes.string.isRequired,
  timeFormat: PropTypes.string.isRequired,
  isExistingMovie: PropTypes.bool.isRequired,
  isExclusionMovie: PropTypes.bool.isRequired
};

AddListMoviePoster.defaultProps = {
  statistics: {
    movieFileCount: 0
  }
};

export default AddListMoviePoster;
