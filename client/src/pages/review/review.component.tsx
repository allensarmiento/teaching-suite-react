import axios from 'axios';
import { Component } from 'react';
import { RouteComponentProps } from 'react-router';

import styles from './review.module.scss';

import Slide from '../../components/slide/slide.component';

import { ISlide } from '../../models/slide-controller';

interface MatchParams {
  id: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

interface State {
  slides: ISlide[];
}

class ReviewComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      slides: [],
    };
  }

  async componentDidMount() {
    const { id } = this.props.match.params;

    if (!id) return;

    try {
      const { data: slides } = await axios
        .get(
          `http://localhost:4000/api/lessons/${id}`,
          { withCredentials: true },
        );

      this.setState({ slides });
    } catch (err) {
      console.log(err);
    }
  }

  lastSlideNumber(slides: ISlide[]) {
    if (slides.length === 0) return -1;

    return slides[slides.length - 1].slide_number;
  }

  render() {
    const { slides } = this.state;

    const renderSlides = (slides: ISlide[]) => {
      const lastSlideNumber = this.lastSlideNumber(slides);

      const result = [];

      for (let i = 1; i <= lastSlideNumber; i++) {
        const filteredSlideItems = slides
          .filter(slide => slide.slide_number === i);

        result.push(filteredSlideItems);
      }

      return result;
    };

    return (
      <div className={styles.review}>
        {renderSlides(slides).map((items, index) => (
          <div key={index} className={styles.slide}>
            <h2 className={styles.heading}>Slide {index + 1}</h2>
            <Slide key={index} items={items} />
          </div>
        ))}
      </div>
    );
  }
};

export default ReviewComponent;
