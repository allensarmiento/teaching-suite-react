export interface ISlide {
  title: string;
  slide_number: number;
  show_review: boolean;
  item_number: number;
  content: string | string[];
  component: 'ImageContent' | 'QuestionContent' | 'TextContent';
}

export class SlideController {
  slides: ISlide[]
  currentSlide: number
  currentItem: number

  constructor() {
    this.slides = [];
    this.currentSlide = 1;
    this.currentItem = 1;
  }

  setSlides(slides: ISlide[]) {
    this.slides = slides;
  }

  get lastSlideNumber() {
    if (this.slides.length === 0) return -1;

    const lastSlideIndex = this.slides.length - 1;
    return this.slides[lastSlideIndex].slide_number;
  }

  get lastSlideItemNumber() {
    const currentSlides = this.slides
      .filter(slide => slide.slide_number === this.currentSlide);

    if (currentSlides.length === 0) return -1;

    const lastSlideIndex = currentSlides.length - 1;
    return currentSlides[lastSlideIndex].item_number;
  }

  slideBackward() {
    if (this.currentItem === 1) {
      this.currentSlide -= 1;
      this.currentItem = this.lastSlideItemNumber;
    } else {
      this.currentItem -= 1;
    }
  }

  slideForward() {
    if (this.currentItem === this.lastSlideItemNumber) {
      this.currentSlide += 1;
      this.currentItem = 1;
    } else {
      this.currentItem += 1;
    }
  }

  get currentItems() {
    const filteredSlides = this.slides
      .filter(slide => slide.slide_number === this.currentSlide);
    
    const filteredItems = filteredSlides
      .filter(item => item.item_number <= this.currentItem);
    
    return filteredItems;
  }

  get prevDisabled() {
    return this.currentSlide === 1 && this.currentItem === 1;
  }

  get nextDisabled() {
    return this.currentSlide > this.lastSlideNumber;
  }

  get finished() {
    return this.currentSlide > this.lastSlideNumber;
  }
}
